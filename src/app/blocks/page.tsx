"use client";
import "./odo.css";
import React, { Suspense, useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import BlocksTable from "@/components/BlocksTable";
import PaginationControls from "@/components/PaginationControls";
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";

import { columns } from "../data/blocks";
import { useExtrinsic } from "@/context/ExtrinsicsContext";
import SearchInput from "@/components/SearchInput";
import { get_latest_blocks } from "@/graphql/queries";
import { Block } from "@/graphql/types";
import { HashLoader } from "react-spinners";
import { ArrowBigLeftDash, ArrowLeft, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const Odometer = dynamic(() => import("react-odometerjs"), {
  ssr: false,
  loading: () => <div>0</div>,
});

function Blocks() {
  const PAGE_SIZE = useSearchParams().get("page") ?? "1";
  const { extrinsic } = useExtrinsic();

  const [currentPage, setCurrentPage] = useState(parseInt(PAGE_SIZE));
  const [blocks, setBLocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(false);
  const { result, refresh } = get_latest_blocks(20, parseInt(PAGE_SIZE) * 20);
  const router = useRouter();
  let data: Block[] | undefined;
  useEffect(() => {
    setLoading(true);
    const intervalId = setInterval(() => {
      refresh();
      setBLocks(data!);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [data, refresh]);

  switch (result.state) {
    case "error":
      return <p>Error {result.message}</p>;
    case "loading":
      return (
        <HashLoader
          className="h-screen"
          size={150}
          style={{ alignContent: "center" }}
          color={"#00A3E4"}
        />
      );
    case "ok":
      data = result.data;
  }
  return (
    <div className="px-4 sm:px-20 lg:px-40 mt-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-2xl">
          Blocks <Odometer value={extrinsic} />
        </p>
        <SearchInput />
      </div>
      <Card>
        <CardBody>
          <BlocksTable users={blocks} loading={loading} columns={columns} />
        </CardBody>
        <CardFooter>
          <PaginationControls
            persistent
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </CardFooter>
      </Card>
    </div>
  );
}

export default function BlocksSuspense() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <Blocks />
    </Suspense>
  );
}
