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
import { get_account } from "@/graphql/queries";
import { Account } from "@/graphql/types";
import { blo } from "blo";

function ExplorerAccount({ }): React.ReactElement {
  const params: any = useParams().id;
  const result = get_account(params);
  let item: Account;
  switch (result.state) {
    case "loading": return <p>Loading...</p>;
    case "error": return <p>Error {result.message}</p>
    case "ok": {
      if (result.data) item = result.data
      else return <p>invalid id</p>
    }
  }

  return (
    <div className="flex flex-row gap-3">
      <Card className="w-full p-4">
        <CardBody className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-2">
            <Image width={52} height={52} alt="profile" className="rounded-full" src={blo(item.evmAddress as `0x${string}`)} />
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
            {
              (() => {
                if (item.totalBalance != item.freeBalance) {
                  return (
                    <>
                      <div className="flex flex-col ">
                        <p className="text-gray-400">Total Balance</p>
                        <div>
                          <Image src="/sel.svg" className="float-left" alt="" width={32} height={32} />
                          {ConvertBigNumber(item.totalBalance)} SEL
                        </div>
                      </div>
                      < div className="flex flex-col " >
                        <p className="text-gray-400">Free Balance</p>
                        <div>
                          <Image src="/sel.svg" className="float-left" alt="" width={32} height={32} />
                          {ConvertBigNumber(item.freeBalance)} SEL
                        </div>
                      </div>
                    </>)
                } else {
                  return <div className="flex flex-col inline-block">
                    <p className="text-gray-400">Total Balance</p>
                    <div>
                      <Image src="/sel.svg" className="float-left" alt="" width={32} height={32} />
                      {ConvertBigNumber(item.totalBalance)} SEL
                    </div>
                  </div>
                }
              })()}
            <div className="flex flex-col ">
              <p className="text-gray-400">Reserved Balance</p>
              <div>
                <Image src="/sel.svg" className="float-left" alt="" width={32} height={32} />
                {ConvertBigNumber(item.reservedBalance)} SEL
              </div>
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
                        src="/sel.svg"
                        alt="sel"
                        width={32}
                        height={32}
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
    </div >
  );
}

export default ExplorerAccount;
