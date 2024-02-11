"use client";

import React, { Suspense, useEffect, useState } from "react";

import ExplorerHeader from "@/components/ExplorerHeader";
import ExtrinsicsTable from "@/components/ExtrinsicsTable";
import { gql, useQuery } from "@apollo/client";
import { Card, CardBody, CardFooter } from "@nextui-org/react";

import { columns } from "../data/extrinsics";
import PaginationControls from "@/components/PaginationControls";
import { useSearchParams } from "next/navigation";
import { useExtrinsic } from "@/context/ExtrinsicsContext";

const GET_LATEST_EXTRINSICS = gql`
  query GetLastestExtrinsics($limit: Int, $offset: Int) {
    extrinsics(limit: $limit, offset: $offset, orderBy: block_timestamp_DESC) {
      id
      extrinsicHash
      timestamp
      success
      fee
      block {
        height
        id
      }
      blockNumber
    }
  }
`;
let signedExtrinsics = null;
function Extrinsics() {
  const { toggleExtrinsic } = useExtrinsic();
  toggleExtrinsic("2000");
  const PAGE_SiZE = useSearchParams().get("page") ?? "1";
  const [currentPage, setCurrentPage] = useState(parseInt(PAGE_SiZE));
  const [loading, setLoading] = useState(false);
  const [extrinsics, setExtrinsics] = useState([]);
  const { data, refetch } = useQuery(GET_LATEST_EXTRINSICS, {
    variables: {
      limit: 20,
      offset: parseInt(PAGE_SiZE),
    },
  });

  useEffect(() => {
    if (!data) {
      return;
    }
    setLoading(true);
    const intervalId = setInterval(() => {
      refetch();
      setExtrinsics(data.extrinsics);
      console.log("extr", data.extrinsics);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [data, refetch]);
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
  const totalPages = Math.ceil(data?.extrinsics.length / itemsPerPage);
  console.log("length", data?.extrinsics.length);

  const handlePageChange = (newPage: number) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setCurrentPage(newPage);
  };

  return (
    <div className="px-60 mt-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-2xl">Extrinsics</p>
        <ExplorerHeader />
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
