"use client";

import React, { Suspense, useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import BlocksTable from "@/components/BlocksTable";
import ExplorerHeader from "@/components/ExplorerHeader";
import PaginationControls from "@/components/PaginationControls";
import { gql, useQuery } from "@apollo/client";
import { Card, CardBody, CardFooter, Pagination } from "@nextui-org/react";

import { columns } from "../data/blocks";
import { useExtrinsic } from "@/context/ExtrinsicsContext";

const GET_LATEST_BLOCKS = gql`
  query GetLatestBlocks($limit: Int, $offset: Int) {
    blocks(limit: $limit, offset: $offset, orderBy: timestamp_DESC) {
      eventsCount
      id
      timestamp
      extrinsicsCount
      height
      hash
      validator
    }
  }
`;

function Blocks() {
  const PAGE_SiZE = useSearchParams().get("page") ?? "1";
  console.log("page sixe", PAGE_SiZE);
  const { extrinsic } = useExtrinsic();

  const [currentPage, setCurrentPage] = useState(parseInt(PAGE_SiZE));
  const [blocks, setBLocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const { data, refetch } = useQuery(GET_LATEST_BLOCKS, {
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
      setBLocks(data.blocks);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [data, refetch]);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(data?.blocks.length / itemsPerPage);
  console.log("length", data?.blocks.length);
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
        <p className="text-2xl">Blocks {extrinsic}</p>
        <ExplorerHeader />
      </div>
      <Card>
        <CardBody>
          <BlocksTable users={blocks} loading={loading} columns={columns} />
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

export default function BlocksSuspense() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <Blocks />
    </Suspense>
  );
}
