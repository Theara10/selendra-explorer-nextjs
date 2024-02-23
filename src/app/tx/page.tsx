"use client";

import React from "react";

import TransfersTable from "@/components/TransfersTable";
import { Card, CardBody } from "@nextui-org/react";

import { columns } from "../data/transfers";
import SearchInput from "@/components/SearchInput";
import { get_latest_transactions } from "@/graphql/queries";
import { Transfer } from "@/graphql/types";

function Transfers() {
  const result = get_latest_transactions(10);
  let data: Transfer[];
  switch (result.state) {
    case "loading": return <p>Loading...</p>;
    case "error": return <p>Error: {result.message}</p>;
    case "ok": data = result.data;
  }

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
          <TransfersTable users={data} columns={columns} />
        </CardBody>
      </Card>
    </div>
  );
}

export default Transfers;
