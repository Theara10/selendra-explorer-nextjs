"use client";

import React from "react";

import Link from "next/link";

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
import { ArrowRight, CheckCircle } from "lucide-react";

type User = {
  timestamp: string;
  id: string;
  extrinsicHash: string;
  fee: number;
  success: boolean;
  block: {
    height: number;
    id: string;
  };
};

interface BlocksTableProps {
  users: User[];
  columns: { uid: string; name: string }[]; // Add columns prop
}

export default function ExtrinsicsTable({ users, columns }: BlocksTableProps) {
  console.log("extrin", users);

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "":
        return (
          <div className="relative flex items-center justify-between py-2 gap-2">
            <p>{}</p>

            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <ArrowRight color="green" size="16px" />
            </span>
          </div>
        );

      case "result":
        return (
          <div className="relative flex items-center justify-start gap-2">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <CheckCircle color="green" size="16px" />
            </span>
          </div>
        );

      case "time":
        return (
          <div className="relative flex items-center justify-start gap-2">
            <p>{timeAgo(user.timestamp)} </p>
          </div>
        );
      case "name":
        return (
          <div className="relative flex items-center justify-start gap-2 text-sel_blue">
            <Link href={`/blocks/${user.block.id}`}>
              <p>{user.block.height} </p>
            </Link>
          </div>
        );
      case "extrinsichash":
        return (
          <div className="relative flex items-center justify-start gap-2">
            <p>{truncateMiddle(user.extrinsicHash, 50)} </p>
          </div>
        );
      case "fee":
        return (
          <div className="relative flex items-center justify-start gap-2">
            <p>{user.fee ? user.fee : "-"} </p>
          </div>
        );
      case "eid":
        return (
          <div className="relative flex items-center justify-start gap-2 text-sel_blue">
            <Link href={`/extrinsics/${user.id}`}>{user.id}</Link>
          </div>
        );

      default:
        return <>{cellValue}</>;
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
        {users.map((item) => (
          <TableRow key={item.id} className=" border-b">
            {(columnKey) => (
              <TableCell>
                <Link href="/explorer/extrinsics/1">
                  {renderCell(item, columnKey)}
                </Link>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
