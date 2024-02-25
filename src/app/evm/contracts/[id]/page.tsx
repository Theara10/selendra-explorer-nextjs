"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
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
import { evm_contract_by_id } from "@/graphql/queries";
import { Contract } from "@/graphql/types";
import ImportToken from "@/components/ImportToken";
import QRCode from "react-qr-code";
import Link from "next/link";
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

function EvmContractAccount({ }): React.ReactElement {
  let [qr, setQr] = useState(false);
  const params: any = useParams().id;
  const result = evm_contract_by_id(params);
  let item: Contract;
  switch (result.state) {
    case "loading": return <p>loading</p>
    case "error": return <p>err</p>
    case "ok": item = result.data;
  }
  console.log(item)
  return (
    <div className="flex flex-row gap-3">
      <Card className="w-full p-4">
        <CardBody className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-2">
            <Image width={52} height={52} alt="profile" src="/profile.png" />
            <p className="text-2xl">{item.name ? item.name : "Unknown"}</p>
            <p className="text-gray-900">{item.symbol ? `(${item.symbol})` : ""}</p>
          </div>
          <div className="flex flex-row items-center gap-2">
            <p className="text-md overflow-hidden">
              <span className="font-semibold mr-2 text-xl">Address:</span>
              {item.id}
            </p>
            <Copy
              size="16px"
              color="gray"
              onClick={() => navigator.clipboard.writeText(item.id)}
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <Link
              href={`/accounts/${item.account}`}
              className="flex items-center gap-2"
            >
              <p className="text-md overflow-hidden text-sel_blue">
                <span className="font-semibold mr-2 text-xl text-black">Owner:</span>
                {item.account}
              </p>
            </Link>
          </div>
          <div className="flex flex-row gap-3 mt-2">
            <div className="bg-primary bg-opacity-20 p-2 flex justify-center items-center rounded-full"
              onClick={() => setQr(!qr)}>
              <QrCode
                className="-2"
                color={qr ? "green" : "#00A4E5"}
                size="16px"
              />
            </div>
            <div className="bg-primary bg-opacity-20 p-2 flex justify-center items-center rounded-full">
              <Fingerprint className="-2" color="#00A4E5" size="16px" />
            </div>
            <div className="bg-primary bg-opacity-20 p-2 flex justify-center items-center rounded-full">
              <Key className="-2" color="#00A4E5" size="16px" />
            </div>
            {item.type == "ERC20" ? <div className="bg-primary bg-opacity-20 p-2 flex justify-center items-center rounded-full">
              <ImportToken contract={item} color="#00A4E5" size="16px" />
            </div> : <></>}
          </div>
          <QRCode value={item.id} style={qr ? {} : { display: "none" }} />
        </CardBody>
      </Card>
    </div >
  );
}
