"use client";

import React from "react";

import Image from "next/image";
import { useParams } from "next/navigation";

import ConvertBigNumber from "@/lib/ConvertBigNumber";
import { gql, useQuery } from "@apollo/client";
import {
  Button,
  Card,
  CardBody,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tab,
  Tabs,
  Tooltip,
} from "@nextui-org/react";
import {
  ChevronDown,
  Copy,
  Fingerprint,
  Key,
  QrCode,
  Wallet,
} from "lucide-react";

function page() {
  return (
    <div className="px-4 sm:px-20 md:px-60 lg:px-80 mt-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xl w-80">Contract Details </p>
        <></>
      </div>

      <EvmContractAccount />

      <Card className="mt-4">
        <CardBody>
          <Tabs aria-label="Options" variant="underlined" color="primary">
            <Tab key="evm" title="EVM Transactions">
              {/* <ExplorerTable users={users} columns={columns}  /> */}
            </Tab>
            <Tab key="wasm" title="WASM Transaction">
              {/* <ExplorerTable users={users} columns={columns}  /> */}
            </Tab>
            <Tab key="erc20" title="ERC-20 Transfers(32)">
              {/* <ExplorerTable users={users} columns={columns}  /> */}
            </Tab>
            <Tab key="erc721" title="ERC-721 Transfers(32)">
              {/* <ExplorerTable users={users} columns={columns}  /> */}
            </Tab>
            <Tab key="contract" title="Contract">
              {/* <ExplorerTable users={users} columns={columns}  /> */}
            </Tab>
          </Tabs>
          {/* <TransfersTable users={users} columns={columns} /> */}
        </CardBody>
      </Card>
    </div>
  );
}

export default page;

const EVM_CONTRACT_BY_ID = gql`
  query evmContractById($id: String!) {
    evmContractById(id: $id) {
      account
      extrinsicHash
      id
      timestamp
      type
    }
  }
`;

function EvmContractAccount({}): React.ReactElement {
  const params = useParams();
  const { loading, error, data } = useQuery(EVM_CONTRACT_BY_ID, {
    variables: { id: params.id },
  });
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log("batman", data);
  const item = data.evmContractById;
  return (
    <div className="flex flex-row gap-3">
      <Card className="w-full p-4">
        <CardBody className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-2">
            <Image width={52} height={52} alt="profile" src="/profile.png" />
            <p className="text-2xl">{item.name ? null : "Unknown"}</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-md overflow-hidden">
              <span className="font-semibold mr-2 text-xl">Address:</span>
              {item.account}
            </p>
            <Copy
              size="16px"
              color="gray"
              onClick={() => navigator.clipboard.writeText(item.account)}
            />
          </div>
          <div className="flex flex-row gap-3 mt-2">
            <div className="bg-primary bg-opacity-20 p-2 flex justify-center items-center rounded-full">
              <Tooltip content="QR Code">
                <QrCode
                  className="-2"
                  color="#00A4E5"
                  size="16px"
                  onClick={() => navigator.clipboard.writeText("")}
                />
              </Tooltip>
            </div>
            <div className="bg-primary bg-opacity-20 p-2 flex justify-center items-center rounded-full">
              <Fingerprint className="-2" color="#00A4E5" size="16px" />
            </div>
            <div className="bg-primary bg-opacity-20 p-2 flex justify-center items-center rounded-full">
              <Key className="-2" color="#00A4E5" size="16px" />
            </div>
          </div>
        </CardBody>
      </Card>

      <Card className="w-full p-4">
        <CardBody className="flex flex-col gap-3">
          <div className="flex flex-row justify-between">
            <div className="flex flex-col ">
              <p className="text-gray-400"> Total Balance</p>
              <p className="text-lg">
                {item.totalBalance ? item.totalBalance : "00"} SEL
              </p>
            </div>
            <div className="flex flex-col ">
              <p className="text-gray-400">Free Balance</p>
              <p className="text-lg">
                {item.freeBalance ? item.freeBalance : "00"} SEL
              </p>
            </div>
            <div className="flex flex-col ">
              <p className="text-gray-400">Reserved Balance</p>
              <p className="text-lg">
                {item.reservedBalance ? item.reservedBalance : "00"} SEL
              </p>
            </div>
          </div>
          <div className="mt-6">
            <p>Token Holding</p>
            <div className="flex flex-row justify-cente gap-2 mt-2">
              <Dropdown placement="bottom-start">
                <DropdownTrigger>
                  <Button className="capitalize pl-6  bg-transparent border-2 w-full flex justify-between">
                    {ConvertBigNumber(item.totalBalance)} SEL
                    <ChevronDown />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  aria-label="Single selection example"
                  variant="flat"
                  disallowEmptySelection
                  // selectionMode="single"
                  // selectedKeys={selectedKeys}
                  // onSelectionChange={setSelectedKeys}
                >
                  <DropdownItem
                    key="copy"
                    startContent={
                      <Image
                        src="/sel-logo-blue.png"
                        alt="sel"
                        width={12}
                        height={22}
                      />
                    }
                    endContent={
                      <p> {ConvertBigNumber(item.totalBalance)} SEL</p>
                    }
                  >
                    Selendra
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              {/* <img src='/wallet.png' className="h-10 w-auto"/> */}
              <div className="bg-primary bg-opacity-20 w-12 flex justify-center items-center rounded-md">
                <Wallet className="" color="#00A4E5" size="26px" />
              </div>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
