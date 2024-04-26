"use client";

import React, { Suspense, useState } from "react";

import AccountsTable from "@/components/AccountsTable";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { User, Users } from "lucide-react";
import dynamic from "next/dynamic";
const Odometer = dynamic(() => import("react-odometerjs"), {
  ssr: false,
  loading: () => <div>0</div>,
});
import "../blocks/odo.css";
import { columns } from "../data/accounts";
import PaginationControls from "@/components/PaginationControls";
import { useSearchParams } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import { get_accounts } from "@/graphql/queries";
import { Account } from "@/graphql/types";
import { HashLoader, ScaleLoader } from "react-spinners";

function Accounts() {
  const PAGE_SIZE = useSearchParams().get("page") ?? "1";
  const [page, setPage] = useState(parseInt(PAGE_SIZE));
  const result = get_accounts();
  let accounts: Account[];

  switch (result.state) {
    case "loading":
      accounts = [];
      break;
    case "error":
      return <p>Error</p>;
    case "ok":
      accounts = result.data;
  }

  return (
    <div className="px-4 sm:px-20 lg:px-80 mt-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-2xl">Accounts</p>
        <div className="flex justify-center items-center">
          <SearchInput />
        </div>
      </div>
      <div className="flex flex-row gap-3">
        <Card className="w-full p-4">
          <CardBody className="flex flex-row gap-3">
            {/* <Image width={52} height={52} alt="account-img" src={account.img} /> */}
            <div className="w-16 h-16 bg-primary bg-opacity-20 rounded-full flex justify-center items-center">
              <Users color="#00A4E5" size="36px" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Holders</p>
              <p className="text-2xl text-default-500">
                <Odometer value={accounts.length} />
              </p>
            </div>
          </CardBody>
        </Card>

        <Card className="w-full p-4">
          <CardBody className="flex flex-row gap-3">
            <div className="w-16 h-16 bg-primary bg-opacity-20 rounded-full flex justify-center items-center">
              <User color="#00A4E5" size="36px" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Active Holders</p>
              <p className="text-2xl text-default-500">-</p>
            </div>
          </CardBody>
        </Card>
      </div>
      <Card className="mt-4">
        <CardBody>
          <AccountsTable
            users={accounts.slice((page - 1) * 20, page * 20)}
            columns={columns}
          />
        </CardBody>
        <CardFooter className="flex justify-end">
          <PaginationControls
            persistent
            currentPage={page}
            max={accounts.length / 20}
            onPageChange={setPage}
          />
        </CardFooter>
      </Card>
    </div>
  );
}

export default function AccountSuspense() {
  return (
    // You could have a loading skeleton as the `fallback` too
    <Suspense>
      <Accounts />
    </Suspense>
  );
}
