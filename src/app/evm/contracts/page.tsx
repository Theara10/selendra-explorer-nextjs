"use client";

import React from "react";

import Image from "next/image";

import ExplorerTable from "@/components/ExplorerTable";
import { Card, CardBody, Tab, Tabs } from "@nextui-org/react";

import { columns } from "../../data/evm_contracts";
import { FileCheck2 } from "lucide-react";
import { get_evm_contracts } from "@/graphql/queries";
import { Contract } from "@/graphql/types";

function EvmContracts() {
  const accounts = [
    {
      id: 1,
      title: "Contract",
      value: "12",
      img: <FileCheck2 size={30} color="#00A4E5" />,
    },
    {
      id: 2,
      title: "Verified Contracts",
      value: null,
      img: <FileCheck2 size={30} color="#00A4E5" />,
    },
    // {
    //   id: 3,
    //   title: "ERC-20 Tokens",
    //   value: null,
    //   img: <FileCheck2 size={30} color="#00A4E5" />,
    // },
    // {
    //   id: 1,
    //   title: "EVM Transactions",
    //   value: null,
    //   img: <FileCheck2 size={30} color="#00A4E5" />,
    // },
    // {
    //   id: 2,
    //   title: "EVM Accounts",
    //   value: null,
    //   img: <FileCheck2 size={30} color="#00A4E5" />,
    // },
    // {
    //   id: 3,
    //   title: "ERC-721 Tokens",
    //   value: null,
    //   img: <FileCheck2 size={30} color="#00A4E5" />,
    // },
  ];

  const result = get_evm_contracts();
  let data: Contract[];
  switch (result.state) {
    case "loading": return <p>Loading...</p>
    case "error": return <p>Error...</p>
    case "ok": data = result.data;
  }

  accounts[0].value = data.length.toLocaleString();
  return (
    <div className="px-4 sm:px-20 md:px-40 lg:px-80 mt-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xl w-80">EVM Contracts</p>
        <></>
      </div>
      <section className="flex flex-wrap justify-between">
        {accounts.map((account) => (
          <Card className="w-[49%] p-2" key={account.id}>
            <CardBody className="flex flex-row gap-1 md:gap-3">
              <div className="w-16 h-16 bg-primary bg-opacity-20 rounded-full flex justify-center items-center">
                {account.img}
              </div>

              <div className="flex flex-col">
                <p className="text-sm  text-default-500">{account.title}</p>
                <p className="text-lg">
                  {account.value !== null && account.value !== undefined ? (
                    <span>{account.value}</span>
                  ) : (
                    <span>-</span>
                  )}
                </p>
              </div>
            </CardBody>
          </Card>
        ))}
      </section>
      <Card className="mt-4">
        <CardBody>
          <Tabs aria-label="Options" variant="underlined" color="primary">
            <Tab key="contracts" title="Contracts">
              <ExplorerTable users={data} columns={columns} />
            </Tab>
            <Tab key="verified" title="Verified Contracts">
              {/* <ExplorerTable users={users} columns={columns} /> */}
              <h2>No contracts</h2>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default EvmContracts;
