"use client";

import React, { Suspense, useEffect, useState } from "react";

import ExtrinsicsTable from "@/components/ExtrinsicsTable";
import { Card, CardBody, CardFooter } from "@nextui-org/react";

import { columns } from "../data/extrinsics";
import PaginationControls from "@/components/PaginationControls";
import { useSearchParams } from "next/navigation";
import { useExtrinsic } from "@/context/ExtrinsicsContext";
import dynamic from "next/dynamic";
const Odometer = dynamic(() => import("react-odometerjs"), {
  ssr: false,
  loading: () => <div>0</div>,
});
import "../blocks/odo.css";
import SearchInput from "@/components/SearchInput";
import { get_latest_extrinsics } from "@/graphql/queries";
import { Extrinsic } from "@/graphql/types";

function Extrinsics() {
  const PAGE_SIZE = useSearchParams().get("page") ?? "1";
  const [page, setPage] = useState(parseInt(PAGE_SIZE));
  const { extrinsic } = useExtrinsic();
  console.log((page - 1) * 20);
  const { result, refresh } = get_latest_extrinsics(20, (page - 1) * 20);
  let data: undefined | Extrinsic[];

  useEffect(() => {
    const intervalId = setInterval(() => {
      refresh();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [refresh]);

  switch (result.state) {
    case "loading":
      data = [];
      break;
    case "error":
      return <p>Error {result.message}</p>;
    case "ok":
      data = result.data;
  }

  return (
    <div className="px-4 sm:px-20 lg:px-80 mt-4">
      <div className="flex items-center justify-between mb-6">
        <p className="text-2xl">
          <Odometer value={extrinsic} /> Extrinsics
        </p>
        <div className="flex justify-center items-center">
          <SearchInput />
        </div>
      </div>
      <Card>
        <CardBody>
          <ExtrinsicsTable users={data} columns={columns} />
        </CardBody>
        <CardFooter className="flex justify-end">
          <PaginationControls
            persistent
            currentPage={page}
            max={extrinsic / 20}
            onPageChange={setPage}
          />
        </CardFooter>
      </Card>
    </div>
  );
}

export default function ExtrinsicSuspense() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <Extrinsics />
    </Suspense>
  );
}
