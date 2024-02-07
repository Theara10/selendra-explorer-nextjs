"use client";

import React from "react";

import Link from "next/link";

import ConvertBigNumber from "@/lib/ConvertBigNumber";
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
import { CheckCircle } from "lucide-react";

// import { columns, users } from './data';

type User = {
  id: string;
  name: string;
  evmAddress: string;
  extrinsics: string;
  totalBalance: number;
  freeBalance: number;
  reward: [];
  extrinsicCount: number;
};

// type User = (typeof users)[0];

interface BlocksTableProps {
  users: User[];
  columns: { uid: string; name: string }[]; // Add columns prop
}

export default function AccountsTable({ users, columns }: BlocksTableProps) {
  console.log("sglagla", users);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "eid":
        return (
          <Link href="/extrinsics/1" className="text-sel_blue">
            <p>#</p>
          </Link>
        );
      case "name":
        return (
          <Link href={`/accounts/${user.id}`} className="text-sel_blue">
            <p>{user.name}</p>
          </Link>
        );
      case "account":
        return (
          <Link
            href={`/accounts/${user.id}`}
            className="text-sel_blue flex items-center gap-2"
          >
            <p>{truncateMiddle(user.evmAddress, 20)}</p>
          </Link>
        );
      case "balance":
        return (
          <Link
            href="/accounts/1"
            className="text-sel_blue flex items-center gap-2"
          >
            <p>{ConvertBigNumber(user.totalBalance)}</p>
          </Link>
        );

      case "reward":
        return (
          <div className="relative flex items-center justify-start gap-2">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              -
            </span>
          </div>
        );
      case "extrinsics":
        return (
          <div className="relative flex items-center justify-start gap-2">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              -
            </span>
          </div>
        );

      default:
        return cellValue;
    }
  }, []);

  return (
    <Table
      aria-label="Example table with custom cells"
      className="pt-0"
      removeWrapper
      // bottomContent={
      //   <div className="flex justify-end">
      //     <Pagination total={10} color="primary" size="sm" />
      //   </div>
      // }
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
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
