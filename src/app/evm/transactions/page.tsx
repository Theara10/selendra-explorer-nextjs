"use client";

import React from "react";

import { Card, CardBody } from "@nextui-org/react";

import { columns, users } from "../../data/evm_contracts";
import ExplorerTable from "@/components/ExplorerTable";

function page() {
  return (
    <div className="px-40 mt-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-2xl">Transactions</p>
        {/* <ExplorerHeader /> */}
      </div>
      <Card>
        <CardBody>
          {/* <ExplorerTable users={users} columns={columns} /> */}
          <p>Coming Soon!</p>
        </CardBody>
      </Card>
    </div>
  );
}

export default page;
