"use client";

import React from "react";

import ExplorerAccount from "@/components/ExplorerAccount";
import ExplorerHeader from "@/components/ExplorerHeader";
// import TransfersTable from '@/components/TransfersTable';
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";

function Account() {
  return (
    <div className="px-60 mt-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-lg w-80">Account </p>
        <ExplorerHeader />
      </div>
      <ExplorerAccount />

      <Card className="mt-4">
        <CardBody>
          <Tabs aria-label="Options" variant="underlined" color="primary">
            <Tab key="photos" title="Extrinsics(6)">
              {/* <TransfersTable users={users} columns={columns} /> */}
            </Tab>
            <Tab key="music" title="Transfers">
              {/* <TransfersTable users={users} columns={columns} /> */}
            </Tab>
            <Tab key="videos" title="WASM Transactions">
              {/* <TransfersTable users={users} columns={columns} /> */}
            </Tab>
          </Tabs>
          {/* <TransfersTable users={users} columns={columns} /> */}
        </CardBody>
      </Card>
    </div>
  );    
}

export default Account;
