"use client";

import React, { Suspense, useState } from "react";

import AccountsTable from "@/components/AccountsTable";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { User, Users } from "lucide-react";

import { columns } from "../data/accounts";
import PaginationControls from "@/components/PaginationControls";
import { useSearchParams } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import { get_accounts } from "@/graphql/queries";
import { Account } from "@/graphql/types";
import { HashLoader, ScaleLoader } from "react-spinners";

function Accounts() {
  const PAGE_SIZE = useSearchParams().get("page") ?? "1";
  const [currentPage, setCurrentPage] = useState(parseInt(PAGE_SIZE));
  const [loading, setLoading] = useState(false);
  const result = get_accounts();
  let accounts: Account[];

  switch (result.state) {
    case "loading": return <div className="px-4 sm:px-20 lg:px-80 mt-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-2xl">Accounts</p>
        <div className="flex justify-center items-center">
          <SearchInput />
        </div>
      </div>
      <div className="flex flex-row gap-3">
        <Card className="w-full p-4">
          <CardBody className="flex flex-row gap-3">
            <div className="w-16 h-16 bg-primary bg-opacity-20 rounded-full flex justify-center items-center">
              <Users color="#00A4E5" size="36px" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Holders</p>
              <ScaleLoader width={13} radius={15} style={{ alignContent: "center" }} color={"#00A3E4"} />
            </div>
          </CardBody>
        </Card>

        <Card className="w-full p-4">
          <CardBody className="flex flex-row gap-3">
            {/* <Image width={52} height={52} alt='account-img' src={account.img} /> */}
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
        <CardBody className="h-40">
          <HashLoader size={150} style={{ alignContent: "center" }} color={"#00A3E4"} />
        </CardBody>
        <CardFooter className="flex justify-end">
        </CardFooter>
      </Card>
    </div>
    case "error": return <p>Error</p>
    case "ok": accounts = result.data;
  }

  const itemsPerPage = 20;
  const totalPages = Math.ceil(accounts.length / itemsPerPage);

  const handlePageChange = (newPage: number) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
    setCurrentPage(newPage);
  };
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
            {/* <Image width={52} height={52} alt='account-img' src={account.img} /> */}
            <div className="w-16 h-16 bg-primary bg-opacity-20 rounded-full flex justify-center items-center">
              <Users color="#00A4E5" size="36px" />
            </div>
            <div className="flex flex-col">
              <p className="text-sm">Holders</p>
              <p className="text-2xl text-default-500">{accounts.length - 1}</p>
            </div>
          </CardBody>
        </Card>

        <Card className="w-full p-4">
          <CardBody className="flex flex-row gap-3">
            {/* <Image width={52} height={52} alt='account-img' src={account.img} /> */}
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
          <AccountsTable users={accounts} columns={columns} />
        </CardBody>
        <CardFooter className="flex justify-end">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
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
