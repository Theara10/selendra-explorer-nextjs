"use client";

import React, { useState } from "react";

import Image from "next/image";

import ExplorerTable from "@/components/ExplorerTable";
import { Card, CardBody, CardFooter, Tab, Tabs } from "@nextui-org/react";
import dynamic from "next/dynamic";
const Odometer = dynamic(() => import("react-odometerjs"), {
  ssr: false,
  loading: () => <div>0</div>,
});
import "../../blocks/odo.css";
import { columns } from "../../data/evm_contracts";
import { FileCheck2, FileBadge } from "lucide-react";
import { get_evm_contracts } from "@/graphql/queries";
import { Contract } from "@/graphql/types";
import PaginationControls from "@/components/PaginationControls";

function EvmContracts() {
  const accounts = [
    {
      id: 1,
      title: "Contract",
      value: 0,
      img: <FileCheck2 size={30} color="#00A4E5" />,
    },
    {
      id: 2,
      title: "Verified Contracts",
      value: null,
      img: <FileBadge size={30} color="#00A4E5" />,
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
  let [page, setPage] = useState(1);
  let data: Contract[];
  switch (result.state) {
    case "loading": {
      data = [];
      break;
    }
    case "error":
      return <p>Error...</p>;
    case "ok":
      data = result.data;
  }
  accounts[0].value = data.length;
  return (
    <div className="px-4 sm:px-20 md:px-40 lg:px-40 mt-6">
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
                    <span>{<Odometer value={account.value} />}</span>
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
              <ExplorerTable
                users={data.slice((page - 1) * 20, page * 20)}
                columns={columns}
              />
            </Tab>
            <Tab key="verified" title="Verified Contracts">
              {/* <ExplorerTable users={users} columns={columns} /> */}
              <h2>No contracts</h2>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
      <Card>
        <CardFooter>
          <PaginationControls
            persistent
            max={data.length / 20}
            currentPage={page}
            onPageChange={setPage}
          />
        </CardFooter>
      </Card>
    </div>
  );
}

export default EvmContracts;
