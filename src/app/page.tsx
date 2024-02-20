// import Image from "next/image";

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24"></main>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";

import ExplorerNav from "@/components/ExplorerNav";
import timeAgo from "@/lib/ConvertTime";
// import { data1 } from '@/constants';
import {
  Card,
  CardBody,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import {
  ArrowRightLeft,
  Blocks,
  CheckCircle,
  History,
  Users,
} from "lucide-react";

import "./styles.css";

import Link from "next/link";

import ConvertBigNumber from "@/lib/ConvertBigNumber";
import truncateMiddle from "@/lib/TruncateMiddle";
import { useQuery } from "@apollo/client";
import { GET_LATEST_TRANSACTIONS } from "./tx/page"
import { GET_LATEST_BLOCKS } from "./blocks/page";
import { useExtrinsic } from "@/context/ExtrinsicsContext";
import { log } from "console";

const Explorer = () => {
  const [totalBlock, setTotalBlock] = useState<number>(0);
  const [totalTokenTransfer, setTotalTokenTransfer] = useState<number>(0);
  const { extrinsic, setExtrinsic } = useExtrinsic();
  console.log("extrinsic", extrinsic);

  const data1 = [
    {
      id: 1,
      title: "Finalized Blocks",
      value: totalBlock,
      icon: <Blocks size={30} color="#00A4E5" />,
    },
    // {
    //   id: 2,
    //   title: "Transactions",
    //   value: "-",
    //   icon: <ArrowRightLeft color="#00A4E5" size={30} />,
    // },
    // {
    //   id: 3,
    //   title: "Holders",
    //   value: "-",
    //   icon: <Users color="#00A4E5" size={30} />,
    // },
    {
      id: 4,
      title: "Signed Extrinsics",
      value: extrinsic,
      icon: <History color="#00A4E5" size={30} />,
    },
  ];

  return (
    <><ExplorerNav
      bgColor={"bg-white"}
      textColor="gray"
      logo="/sel-logo-text.png"
      search={true}
      selIcon="/sel-logo-blue.png"
    />
      <div className="px-4">
        <section className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-2">
          {data1.map((data) => {
            return (
              <Card className="w-full" key={data.id}>
                <CardBody className="flex gap-2 md:gap-4 flex-row items-center p-3 md:p-6">
                  {data.icon}
                  <div className="flex flex-col">
                    <p className="text-sm text-default-500">{data.title}</p>
                    <p className="text-xl md:text-2xl ">{data.value}</p>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </section>
        <section className="mt-6 flex flex-col md:flex-row gap-4">
          <LatestBlocks setTotalBlock={setTotalBlock} />
          <LatestTrasactions setTotalTokenTransfer={setTotalTokenTransfer} />
        </section>
      </div>
    </>
  );
};

export default Explorer;
interface LatestBlocksProps {
  setTotalBlock: (newTotalBlock: number) => void;
}

const LatestBlocks: React.FC<LatestBlocksProps> = ({ setTotalBlock }) => {
  const { loading, error, data, refetch } = useQuery(GET_LATEST_BLOCKS, {
    variables: {
      limit: 20,
      offset: 0,
    },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      refetch();
    }, 1000);

    return () => clearInterval(intervalId);
  }, [refetch]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Card className="w-full">
      <CardHeader className="border-b">Latest Blocks</CardHeader>
      <CardBody>
        <Table
          aria-label="Example empty table"
          removeWrapper
          hideHeader
          bottomContent={
            <div className="flex items-center justify-center ">
              <Link href="/blocks">View All Blocks</Link>
            </div>
          }
          className="pt-0"
          classNames={{ wrapper: "pt-0" }}
        >
          <TableHeader>
            <TableColumn>Blocks</TableColumn>
            <TableColumn>Time</TableColumn>
          </TableHeader>
          <TableBody>
            {data.blocks.map(
              (x: {
                id: string;
                extrinsicsCount: number;
                eventsCount: number;
                height: number;
                timestamp: string;
              }) => {
                setTotalBlock(x.height);
                return (
                  <TableRow key={x.id} className=" border-b">
                    <TableCell>
                      <Link
                        href={`/blocks/${x.id}`}
                        className="text-primary font-semibold"
                      >
                        <User
                          avatarProps={{ radius: "md", src: "/block.png" }}
                          description={
                            <p className=" font-light">
                              Include
                              <span className="text-primary ml-2">
                                {x.extrinsicsCount} Extrinsics {x.eventsCount}{" "}
                                Events
                              </span>
                            </p>
                          }
                          name={x.height}
                        />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="relative flex items-center justify-end gap-2 font-light">
                        <p>{timeAgo(x.timestamp)}</p>

                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <CheckCircle color="green" size="16px" />
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};

interface LatestTokenTransferProps {
  setTotalTokenTransfer: (newTotalBlock: number) => void;
}

const LatestTrasactions: React.FC<LatestTokenTransferProps> = ({
  setTotalTokenTransfer,
}) => {
  const { loading, error, data } = useQuery(GET_LATEST_TRANSACTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  console.table("latest transactions", data.transfers);

  return (
    <Card className="w-full">
      <CardHeader className="border-b">Latest Transactions</CardHeader>
      <CardBody>
        <Table
          aria-label="Example empty table"
          removeWrapper
          hideHeader
          bottomContent={
            <div className="flex items-center justify-center ">
              <Link href="/tx">View All Transactions</Link>
            </div>
          }
          className="pt-0"
          classNames={{ wrapper: "pt-0" }}
        >
          <TableHeader>
            <TableColumn>Blocks</TableColumn>
            <TableColumn>Time</TableColumn>
          </TableHeader>
          <TableBody>
            {data.transfers.map(
              (
                x: {
                  id: string;
                  from: { evmAddress: string };
                  to: { evmAddress: string };
                  blockNumber: number;
                  amount: number;
                  timestamp: string;
                  symbol: string;
                },
                index: number
              ) => {
                console.log("tokenTransfers", typeof x.from);
                setTotalTokenTransfer(index);
                return (
                  <TableRow key={x.id} className=" border-b">
                    <TableCell>
                      <Link href={`/tx/${x.id}`} className="text-sel_blue font-semibold ">
                        <User
                          avatarProps={{
                            radius: "md",
                            src: "/transaction.png",
                          }}
                          description={
                            <p className="font-light">
                              From
                              <span className="text-sel_blue ml-2">
                                <Link href="/accounts/1">
                                  {truncateMiddle(
                                    x.from.evmAddress,
                                    32
                                  )}
                                </Link>
                                <br className="md:hidden" />
                                <span className="pr-2 md:px-2 text-gray-400">
                                  To
                                </span>
                                <Link href="#" className="truncate">
                                  {truncateMiddle(x.to.evmAddress, 32)}
                                </Link>
                              </span>
                            </p>
                          }
                          name={x.blockNumber}
                        />
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="relative flex flex-col items-end justify-end font-light">
                        <p className="text-md">
                          {ConvertBigNumber(x.amount)}
                          <span> {x.symbol}</span>
                        </p >
                        <p>{timeAgo(x.timestamp)}</p>
                      </div >
                    </TableCell >
                  </TableRow >
                );
              }
            )}
          </TableBody >
        </Table >
      </CardBody >
    </Card >
  );
};
