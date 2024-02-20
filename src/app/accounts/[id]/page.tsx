"use client";

import React from "react";

import ExplorerAccount from "@/components/ExplorerAccount";
// import TransfersTable from '@/components/TransfersTable';
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import SearchInput from "@/components/SearchInput";

function Account() {
  return (
    <div className="px-4 sm:px-20 lg:px-80 mt-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-2xl">Account</p>
        <div className="flex justify-center items-center">
          <SearchInput />
        </div>
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
