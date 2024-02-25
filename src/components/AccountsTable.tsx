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
import { Account } from "@/graphql/types";

interface BlocksTableProps {
  users: Account[];
  columns: { uid: string; name: string }[]; // Add columns prop
}

export default function AccountsTable({ users, columns }: BlocksTableProps) {
  const renderCell = React.useCallback((user: Account, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof Account];

    switch (columnKey) {
      case "name":
        return (
          <Link href={`/accounts/${user.id}`} className="text-sel_blue">
            <p>placeholder</p>
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
