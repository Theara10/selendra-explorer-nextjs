"use client";

import React from "react";

import ExplorerAccount from "@/components/ExplorerAccount";
// import TransfersTable from '@/components/TransfersTable';
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";
import SearchInput from "@/components/SearchInput";
import { useParams } from "next/navigation";
import { get_account_transactions } from "@/graphql/queries";
import TransfersTable from "@/components/TransfersTable";
import { columns } from "../../data/transfers";
import { Transfer } from "@/graphql/types";

function Account() {
  let id: any = useParams().id;

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
            <Tab key="transfers" title="Transfers">
              {
                (() => {
                  let tx = get_account_transactions(id);
                  switch (tx.state) {
                    case "loading": return <p>Loading</p>
                    case "error": return <p>Error</p>
                    case "ok": return <TransfersTable users={tx.data} columns={columns} />;
                  }
                })()
              }
              {/* <TransfersTable users={users} columns={columns} /> */}
            </Tab>
            <Tab key="photos" title="Extrinsics(TODO)">
              {/* <TransfersTable users={users} columns={columns} /> */}
            </Tab>
            <Tab key="videos" title="WASM Transactions(TODO">
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
