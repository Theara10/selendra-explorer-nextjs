"use client";

import React from "react";

import TransfersTable from "@/components/TransfersTable";
import { gql, useQuery } from "@apollo/client";
import { Card, CardBody } from "@nextui-org/react";

import { columns } from "../data/transfers";
import SearchInput from "@/components/SearchInput";

export const GET_LATEST_TRANSACTIONS = gql`
query GetLatestTransactions {
  transfers(limit: 10, orderBy: timestamp_DESC) {
    blockNumber
    amount
    from {
      evmAddress
    }
    to {
      evmAddress
    }
    timestamp
    id
    success
  symbol
  }
}
`;

function Transfers() {
  const { loading, error, data } = useQuery(GET_LATEST_TRANSACTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.table("latest transactions", data.transfers);
  const tokenTransfers = data.transfers;
  return (
    <div className="px-10 mt-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-2xl">Transactions</p>
        <div className="flex justify-center items-center">
          <SearchInput />
        </div>
      </div>
      <Card>
        <CardBody>
          <TransfersTable users={tokenTransfers} columns={columns} />
        </CardBody>
      </Card>
    </div>
  );
}

export default Transfers;
