"use client";
import "./hl.css"
import styles from "../../../../components/code.module.css"
import { init, hl } from './hl'
init();
import { Contract as Ctr } from 'sevm';
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
  Recycle,
  Wallet,
  XCircle,
} from "lucide-react";
import { columns } from '../../../data/transfers'
import { evm_contract_by_id, evm_transfers_by_id } from "@/graphql/queries";
import { Contract } from "@/graphql/types";
import ImportToken from "@/components/ImportToken";
import QRCode from "react-qr-code";
import Link from "next/link";
import TransfersTable from "@/components/TransfersTable";
import { blo } from "blo";
import { map, map_or } from "@/lib/utils";
import { light, useThemeState } from "@/app/theme";
function Page({ }): React.ReactElement {
  const params: any = useParams().id;
  return (
    <div className="px-4 sm:px-20 md:px-60 lg:px-80 mt-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xl w-80">Contract Details </p>
        <></>
      </div>

      <EvmContractAccount id={params} />

      <Card className="mt-4">
        <CardBody>
          <Tabs aria-label="Options" variant="underlined" color="primary">
            <Tab key="evm" title="EVM Transactions">
              {
                (() => {
                  let txs = evm_transfers_by_id(params);
                  switch (txs.state) {
                    case "loading": return <p>loading</p>
                    case "error": return <p>:(</p>
                    case "ok": return <TransfersTable users={txs.data} columns={columns} />
                  }
                })()
              }
            </Tab>
            {/* <Tab key="wasm" title="WASM Transaction">
              <ExplorerTable users={users} columns={columns}  />
            </Tab>
            <Tab key="erc20" title="ERC-20 Transfers(32)">
              <ExplorerTable users={users} columns={columns}  />
            </Tab>
            <Tab key="erc721" title="ERC-721 Transfers(32)">
              <ExplorerTable users={users} columns={columns}  />
            </Tab> */}
            <Tab key="contract" title="Contract">
              <ContractExplorer id={params} />
            </Tab>
          </Tabs>
          {/* <TransfersTable users={users} columns={columns} /> */}
        </CardBody>
      </Card>
    </div>
  );
}

export default Page;

function ContractExplorer({ id }: { id: string }): React.ReactElement {
  const result = evm_contract_by_id(id);
  let item: Contract;
  switch (result.state) {
    case "loading": return <p>loading</p>
    case "error": return <p>err</p>
    case "ok": {
      if (result.data) item = result.data
      else return <p>invalid id</p>
    }
  }
  const contract = new Ctr(item.bytecode!);
  return <Tabs aria-label="code" variant="underlined" color="primary">
    <Tab key="bytes" title="Bytecode">
      <pre className={styles.code} style={{
        fontSize: "0.8em",
        whiteSpace: "pre-wrap",
        wordWrap: "break-word"
      }}>{item.bytecode}</pre>
    </Tab>
    <Tab key="ops" title="Opcodes">
      <div className={styles.code} style={{ fontWeight: 550 }}>{
        contract.opcodes().map((opcode, i) => <div key={opcode.mnemonic + i}>{<span className="hljs-symbol" >{opcode.mnemonic}</span>}
          {map_or(
            opcode.hexData(), <></>, x => <span className="hljs-section">{" 0x" + x.trimStart()}</span>
          )}
        </div>)
      }</div>

    </Tab>
    <Tab key="source" title={<p className="flex items-center">Source Code <Recycle style={{ margin: "1ch", color: "green" }} size="24px" /></p>} >
      <pre className={styles.code} style={{ fontWeight: 550 }} dangerouslySetInnerHTML={{
        __html: hl(contract.solidify())
      }}></pre>
    </Tab>
  </Tabs >
}

function EvmContractAccount({ id }: { id: string }): React.ReactElement {
  let [qr, setQr] = useState(false);
  const [theme] = useThemeState();
  const result = evm_contract_by_id(id);
  let item: Contract;
  switch (result.state) {
    case "loading": return <p>loading</p>
    case "error": return <p>err</p>
    case "ok": {
      if (result.data) item = result.data
      else return <p>invalid id</p>
    }
  }
  console.log(item)
  return (
    <div className="flex flex-row gap-3">
      <Card className="w-full p-4">
        <CardBody className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-2">
            <Image width={52} height={52} alt="profile" className="rounded-full w-6 h-6" src={blo(item.id as `0x${string}`)} />
            <p className="text-2xl">{item.name ? item.name : "Unknown"}</p>
            <p className="text-gray-900 dark:text-gray-400">{item.symbol ? `(${item.symbol})` : ""}</p>
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
            <span className="font-semibold text-xl">Owner:</span>
            <Link href={`/accounts/${item.account}`}>
              <p className="text-md overflow-hide text-sel_blue">
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
          <QRCode fgColor={light(theme) ? undefined : "#18181B"} bgColor={light(theme)? undefined : "hsl(214, 11.6%, 85%)"} value={item.id} style={qr ? {} : { display: "none" }} />
        </CardBody>
      </Card>
    </div >
  );
}
