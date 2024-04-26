"use client";

import React, { useState } from "react";

import Link from "next/link";

import ConvertBigNumber from "@/lib/ConvertBigNumber";
import timeAgo from "@/lib/ConvertTime";
import truncateMiddle from "@/lib/TruncateMiddle";
import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import { ArrowRight, CheckCircle, XCircle } from "lucide-react";
import { Transfer } from "@/graphql/types";
import PaginationControls from "./PaginationControls";

// import { columns, users } from './data';

// type User = (typeof users)[0];

interface BlocksTableProps {
  users: Transfer[];
  columns: { uid: string; name: string }[]; // Add columns prop
}

export default function TransfersTable({ users, columns }: BlocksTableProps) {
  let [page, setPage] = useState(1);
  const renderCell = React.useCallback(
    (user: Transfer, columnKey: React.Key): React.ReactNode => {
      switch (columnKey) {
        case "from":
          return (
            <div className="relative flex items-center justify-between py-2 gap-2">
              <Link
                href={`/accounts/${user.from.id}`}
                className="text-sel_blue"
              >
                <p>{truncateMiddle(user.from.evmAddress, 20)}</p>
              </Link>
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                <ArrowRight color="green" size="16px" />
              </span>
            </div>
          );
        case "to":
          return (
            <Link href={`/accounts/${user.to.id}`} className="text-sel_blue">
              <p>{truncateMiddle(user.to.evmAddress, 20)}</p>
            </Link>
          );

        case "block":
          return (
            <Link
              href={`/blocks/${user.blockNumber}`}
              className="text-sel_blue"
            >
              <p>{user.blockNumber}</p>
            </Link>
          );
        case "time":
          return <p>{timeAgo(user.timestamp)}</p>;
        case "value":
          return (
            <div className="flex items-center gap-2">
              {ConvertBigNumber(user.amount)}
              <Link
                href={`/evm/contracts/${user.contract}`}
                className="text-sel_blue"
              >
                {user.symbol}
              </Link>
            </div>
          );
        case "eid":
          return (
            <Link
              href={`/tx/${user.id}`}
              className="text-sel_blue flex items-center gap-2"
            >
              <p>{truncateMiddle(user.id, 50)}</p>
            </Link>
          );

        case "result":
          return (
            <div className="relative flex items-center justify-start gap-2">
              <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                {user.success ? (
                  <CheckCircle color="green" size="24px" />
                ) : (
                  <XCircle color="red" size="24px" />
                )}
              </span>
            </div>
          );

        default:
        // return cellValue;
      }
    },
    []
  );

  // const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
  //   const cellValue = user[columnKey as keyof User];

  //   switch (columnKey) {
  //     case "from":
  //       return (
  //         <div className="relative flex items-center justify-between py-2 gap-2">
  //           <Link href="" className="text-sel_blue">
  //             <p>{truncateMiddle(user.from.evmAddress, 20)}</p>
  //           </Link>

  //           <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
  //             <ArrowRight color="green" size="16px" />
  //           </span>
  //         </div>
  //       );
  //     case "to":
  //       return (
  //         <Link href="" className="text-sel_blue">
  //           <p>{truncateMiddle(user.to.evmAddress, 20)}</p>
  //         </Link>
  //       );

  //     case "block":
  //       return (
  //         <Link href={`/blocks/${user.id}`} className="text-sel_blue">
  //           <p>{user.blockNumber}</p>
  //         </Link>
  //       );
  //     case "time":
  //       return (
  //         <Link href="/accounts/1" className="flex items-center gap-2">
  //           <p>{timeAgo(user.timestamp)}</p>
  //         </Link>
  //       );
  //     case "value":
  //       return (
  //         <div className="flex items-center gap-2">
  //           <p>{ConvertBigNumber(user.amount)}</p>
  //         </div>
  //       );
  //     case "eid":
  //       return (
  //         <Link
  //           href={`/tx/${user.id}`}
  //           className="text-sel_blue flex items-center gap-2"
  //         >
  //           <p>{truncateMiddle(user.id, 50)}</p>
  //         </Link>
  //       );

  //     case "result":
  //       return (
  //         <div className="relative flex items-center justify-start gap-2">
  //           <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
  //             {user.success ? <CheckCircle color="green" size="16px" /> : "-"}
  //           </span>
  //         </div>
  //       );

  //     default:
  //       return cellValue;
  //   }
  // }, []);

  let txs = users.slice((page - 1) * 20, page * 20);
  return (
    <Table
      aria-label="Example table with custom cells"
      className="pt-0"
      removeWrapper
      bottomContent={
        <PaginationControls
          max={users.length / 20}
          onPageChange={setPage}
          currentPage={page}
        />
      }
    >
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn
            key={column.uid}
            align={column.uid === "actions" ? "end" : "start"}
            className="text-md"
          >
            {column.name}
          </TableColumn>
        )}
      </TableHeader>
      <TableBody items={txs} className="border-b-2">
        {txs.map((item) => (
          <TableRow key={item.id} className=" border-b">
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
