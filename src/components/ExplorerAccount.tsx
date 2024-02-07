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

const ACCOUNT_BY_ID = gql`
  query AccountByID($id: String!) {
    accountById(id: $id) {
      id
      evmAddress
      freeBalance
      reservedBalance
      totalBalance
      updatedAt
    }
  }
`;

function ExplorerAccount({}): React.ReactElement {
  const params = useParams();
  const { loading, error, data } = useQuery(ACCOUNT_BY_ID, {
    variables: { id: params.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;
  console.log("batman", data);
  const item = data.accountById;
  return (
    <div className="flex flex-row gap-3">
      <Card className="w-full p-4">
        <CardBody className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-2">
            <Image width={52} height={52} alt="profile" src="/profile.png" />
            <p className="text-2xl">{item.name ? item.name : "Unknown"}</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-md overflow-hidden">
              <span className="font-semibold mr-2 text-xl">Address:</span>
              {item.evmAddress}
            </p>
            <Copy
              size="16px"
              color="gray"
              className="cursor-pointer"
              onClick={() => navigator.clipboard.writeText(item.evmAddress)}
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
                {ConvertBigNumber(item.totalBalance)} SEL
              </p>
            </div>
            <div className="flex flex-col ">
              <p className="text-gray-400">Free Balance</p>
              <p className="text-lg">
                {ConvertBigNumber(item.freeBalance)} SEL
              </p>
            </div>
            <div className="flex flex-col ">
              <p className="text-gray-400">Reserved Balance</p>
              <p className="text-lg">
                {ConvertBigNumber(item.reservedBalance)} SEL
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

export default ExplorerAccount;
