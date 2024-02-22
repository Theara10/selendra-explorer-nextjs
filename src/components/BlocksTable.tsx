"use client";

import React from "react";

import Image from "next/image";
import Link from "next/link";

import truncateMiddle from "@/lib/TruncateMiddle";
import {
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  User,
} from "@nextui-org/react";
import { CheckCircle } from "lucide-react";

import timeAgo from "../lib/ConvertTime";

type User = {
  eventsCount: number;
  id: string;
  timestamp: string;
  extrinsicsCount: number;
  height: number;
  validator: string;
};

interface BlocksTableProps {
  users: User[];
  columns: { uid: string; name: string }[];
  loading: boolean;
}

export default function BlocksTable({
  users,
  columns,
  loading,
}: BlocksTableProps) {
  {
    users?.map((x, i) => {
      // console.log("timess", timeAgo(x.timestamp));
      return <p key={i}>{timeAgo(x.timestamp)}</p>;
    });
  }

  const renderCell = React.useCallback((user: User, columnKey: React.Key) => {
    console.log("time", timeAgo(user.timestamp));
    const cellValue = user[columnKey as keyof User];

    switch (columnKey) {
      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            <p>{timeAgo(user.timestamp)}</p>

            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <CheckCircle color="green" size="16px" />
            </span>
          </div>
        );

      case "status":
        return (
          <div className="relative flex items-center justify-end gap-2">
            <p>5 secs ago</p>

            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <CheckCircle color="green" size="24px" />
            </span>
          </div>
        );
      case "blocksstatus":
        return (
          <div className="relative flex items-center justify-start gap-2">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
              <CheckCircle color="green" size="16px" />
            </span>
          </div>
        );

      case "age":
        return (
          <div className="relative flex items-center justify-start gap-2">
            <p>{timeAgo(user.timestamp)} </p>
          </div>
        );
      case "name":
        return (
          <div className="relative flex text-sel_blue items-center justify-start gap-2">
            <Link href={`/blocks/${user.id}`}>
              <p>{user.height} </p>
            </Link>
          </div>
        );
      case "extrinsics":
        return (
          <div className="relative flex items-center justify-start gap-2 ">
            <Link href="#">{user.extrinsicsCount}</Link>
          </div>
        );
      case "events":
        return (
          <div className="relative flex items-center justify-start gap-2">
            <p>{user.eventsCount}</p>
          </div>
        );
      case "validators":
        return (
          <Link href="#">
            <div className="relative flex flex-row items-center justify-start gap-2 text-sel_blue">
              <Image
                src="/profile.png"
                alt="validator-pf"
                width={500}
                height={500}
                className="w-6 h-6"
              />
              <p>{truncateMiddle(user.validator, 52)}</p>
            </div>
          </Link>
        );
      case "blockhash":
        return (
          <Link
            href={`/blocks/${user.id}`}
            className="relative flex items-center justify-start gap-2 text-sel_blue"
          >
            <p>{truncateMiddle(user.id, 52)}</p>
          </Link>
        );
      default:
        return cellValue;
    }
  }, []);

  return (
    <div>
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
        <TableBody
          items={users}
          isLoading={!loading}
          loadingContent={<Spinner color="primary" />}
          className="border-b-2"
        >
          {users.map((item) => (
            <TableRow key={item.id} className="border-b">
              {(columnKey) => {
                return <TableCell>{renderCell(item, columnKey)}</TableCell>;
              }}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
