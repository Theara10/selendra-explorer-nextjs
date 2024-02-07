"use client";

import React, { useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import BlocksTable from "@/components/BlocksTable";
import ExplorerHeader from "@/components/ExplorerHeader";
import PaginationControls from "@/components/PaginationControls";
import { gql, useQuery } from "@apollo/client";
import { Card, CardBody, CardFooter, Pagination } from "@nextui-org/react";

import { columns } from "../data/blocks";

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
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  const itemsPerPage = 20;
  const totalPages = Math.ceil(data?.blocks.length / itemsPerPage);
  console.log("length", data?.blocks.length);

  // const start = (currentPage - 1) * itemsPerPage;
  // const end = start + itemsPerPage;

  // const currentData = data.blocks.slice(start, end);

  const handlePageChange = (newPage: number) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setCurrentPage(newPage);
    // console.log("currentPage", currentPage);
    // console.log("totalPage", totalPages);
  };

  return (
    <div className="px-4 sm:px-20 lg:px-80 mt-4">
      <div className="flex items-center justify-between mb-6">
        <p className="text-2xl">Blocks</p>
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
          {/* <Pagination total={10} color="primary" size="sm" /> */}
        </CardFooter>
      </Card>
    </div>
  );
}

export default Blocks;
