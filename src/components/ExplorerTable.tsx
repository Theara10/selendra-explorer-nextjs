"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import truncateMiddle from "@/lib/TruncateMiddle";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { FileCode2 } from "lucide-react";
import { Contract } from "@/graphql/types";
import ImportToken from "./ImportToken";

interface BlocksTableProps {
  users: Contract[];
  columns: { uid: string; name: string }[];
}

export default function ExplorerTable({ users, columns }: BlocksTableProps) {
  const renderCell = React.useCallback(
    (user: Contract, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof Contract];
      switch (columnKey) {
        case "contract":
          return (
            <div className="relative flex items-center flex-row text-sel_blue  gap-2">
              <ImportToken color="gray" size="24px" contract={user} />
              <Link
                href={`/evm/contracts/${user.id}`}
                className="flex items-center justify-center"
              >
                <FileCode2 color="gray" size="16px" />
                <p className="ml-1">{truncateMiddle(user.account, 30)}</p>
              </Link>
            </div>
          );

        case "name":
          return (
            <div className="relative flex items-center  gap-2">
              <p>
                {user.name
                  ? user.symbol
                    ? `${user.name} (${user.symbol})`
                    : user.name
                  : "-"}
              </p>
            </div>
          );
        case "block":
          return (
            <div className="relative flex items-center justify-start gap-2 text-sel_blue">
              <Link href={`/blocks/${user.block}`}>
                <p className="ml-1">{user.block.toString()}</p>
              </Link>
            </div>
          );
        case "account":
          return (
            <div className="relative flex items-center justify-start gap-2 text-sel_blue">
              <Link href={`/accounts/${user.account}`}>
                <p className="ml-1">{truncateMiddle(user.account, 30)}</p>
              </Link>
            </div>
          );
        case "verified_time":
          return (
            <div className="relative flex items-center justify-start gap-2">
              <p>- </p>
            </div>
          );
        case "extrinsichash":
          return (
            <div className="relative flex items-center justify-start gap-2">
              <Link
                href={`/extrinsics/${user.extrinsicHash}`}
                className="text-sel_blue"
              >
                <p>{truncateMiddle(user.extrinsicHash, 50)}</p>
              </Link>
            </div>
          );

        default:
          return cellValue;
      }
    },
    []
  );

  return (
    <div>
      <Table
        aria-label="Example table with custom cells"
        className="pt-0"
        removeWrapper
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
        <TableBody items={users} className="border-b-2">
          {(item) => (
            <TableRow key={item.id} className=" border-b">
              {(columnKey) => {
                return <TableCell>{renderCell(item, columnKey)}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
