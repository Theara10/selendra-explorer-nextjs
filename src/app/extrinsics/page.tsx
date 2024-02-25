"use client";

import React, { Suspense, useEffect, useState } from "react";

import ExtrinsicsTable from "@/components/ExtrinsicsTable";
import { Card, CardBody, CardFooter } from "@nextui-org/react";

import { columns } from "../data/extrinsics";
import PaginationControls from "@/components/PaginationControls";
import { useSearchParams } from "next/navigation";
import { useExtrinsic } from "@/context/ExtrinsicsContext";
import SearchInput from "@/components/SearchInput";
import { get_latest_extrinsics } from "@/graphql/queries";
import { Extrinsic } from "@/graphql/types";

let signedExtrinsics = null;
function Extrinsics() {
  const PAGE_SiZE = useSearchParams().get("page") ?? "1";
  const [currentPage, setCurrentPage] = useState(parseInt(PAGE_SiZE));
  const [loading, setLoading] = useState(false);
  const [extrinsics, setExtrinsics] = useState<Extrinsic[]>([]);
  const { result, refresh } = get_latest_extrinsics(20, parseInt(PAGE_SiZE));
  let data: undefined | Extrinsic[];
  useEffect(() => {
    setLoading(true);
    const intervalId = setInterval(() => {
      refresh();
      setExtrinsics(data!);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [data, refresh]);

  switch (result.state) {
    case "loading": return <p>loading</p>
    case "error": return <p>Error {result.message}</p>
    case "ok": data = result.data;
  }
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     refetch();
  //   }, 1000);

  //   return () => clearInterval(intervalId);
  // }, [refetch]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;
  // console.log("extrinsics", data.extrinsics);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const handlePageChange = (newPage: number) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setCurrentPage(newPage);
  };

  return (
    <div className="px-4 sm:px-20 lg:px-80 mt-4">
      <div className="flex items-center justify-between mb-6">
        <p className="text-2xl">Extrinsics</p>
        <div className="flex justify-center items-center">
          <SearchInput />
        </div>
      </div>
      <Card>
        <CardBody>
          <ExtrinsicsTable users={extrinsics} columns={columns} />
        </CardBody>
        <CardFooter className="flex justify-end">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
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
