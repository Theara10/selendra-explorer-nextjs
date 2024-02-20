"use client";

import React, { Suspense, useEffect, useState } from "react";

import AccountsTable from "@/components/AccountsTable";
import { gql, useQuery } from "@apollo/client";
import { Card, CardBody, CardFooter } from "@nextui-org/react";
import { User, Users } from "lucide-react";

import { columns } from "../data/accounts";
import PaginationControls from "@/components/PaginationControls";
import { useSearchParams } from "next/navigation";
import SearchInput from "@/components/SearchInput";

const GET_ACCOUNTS = gql`
  query Accounts {
    accounts {
      evmAddress
      freeBalance
      id
      totalBalance
      updatedAt
      reservedBalance
    }
  }
`;

function Accounts() {
  const PAGE_SiZE = useSearchParams().get("page") ?? "1";
  const [currentPage, setCurrentPage] = useState(parseInt(PAGE_SiZE));
  const [loading, setLoading] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const { error, data } = useQuery(GET_ACCOUNTS);
  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error :(</p>;
  // const accounts = data.accounts;
  // console.log("accounts", accounts.length);
  useEffect(() => {
    if (!data) {
      return;
    }
    setLoading(true);
    const intervalId = setInterval(() => {
      setAccounts(data.accounts);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [data]);

  const itemsPerPage = 20;
  const totalPages = Math.ceil(data?.accounts.length / itemsPerPage);
  console.log("length", data?.accounts.length);

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
              <p className="text-sm">Holder</p>
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
              <p className="text-sm">Active Holder</p>
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
