"use client";

import * as React from "react";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import ConvertBigNumber from "@/lib/ConvertBigNumber";
import timeAgo from "@/lib/ConvertTime";
import truncateMiddle from "@/lib/TruncateMiddle";
import { gql, useQuery } from "@apollo/client";
import { Card, CardBody } from "@nextui-org/react";
import { CheckCircle, Copy, XCircle } from "lucide-react";
import { Transfer } from "@/graphql/types";
import { transfer_by_hash } from "@/graphql/queries";

/**
 * Interface for the props passed to the BlockPage component.
 * Contains the route params with the block ID.
 */
export interface BlockPageProps {
  params: {
    id: string;
  };
}

const TransferDetails: React.FC<BlockPageProps> = () => {
  const params = useParams();
  const id = (params.id as string).startsWith("0x")
    ? (params.id as string)
    : "0x" + params.id;
  console.log("params", id);
  const result = transfer_by_hash(id);
  let transfer: Transfer;
  switch (result.state) {
    case "loading":
      return <p>loading</p>;
    case "error":
      return <p>Error {result.message}</p>;
    case "ok": {
      if (result.data) transfer = result.data;
      else return <p>invalid id</p>;
    }
  }

  return (
    <div className="px-4">
      <div className="flex items-center">
        <span className="text-2xl w-[7ch]">Transfer</span>
        <span className="text-gray-400">
          #{truncateMiddle(transfer.id, 50)}
        </span>
        {transfer.success ? (
          <CheckCircle className="m-2" color="green" size="32px" />
        ) : (
          <XCircle className="m-2" color="red" size="32px" />
        )}
      </div>
      <Card>
        <CardBody>
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-4">
            <table className="min-w-full">
              <tbody>
                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    Timestamp
                  </td>
                  <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                    {transfer.timestamp}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    Block Time
                  </td>
                  <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                    {timeAgo(transfer.timestamp)}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    Block Number
                  </td>
                  <td className=" flex items-center gap-2 text-sm font-light px-6 py-4 whitespace-nowrap">
                    <span>
                      <CheckCircle color="green" size="24px" />
                    </span>
                    {transfer.blockNumber}
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="px-6 py-4 text-sm font-medium">
                    Extrinsic Hash
                  </td>
                  <td className=" flex items-center gap-2 text-sm font-light px-6 py-4">
                    {transfer.extrinsicHash}
                    <span>
                      <Copy
                        size="24px"
                        color="gray"
                        className="cursor-pointer"
                        onClick={() =>
                          navigator.clipboard.writeText(transfer.id)
                        }
                      />
                    </span>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    Asset Transfer
                  </td>
                  <td className="text-sm font-light px-6 py-4 whitespace-normal">
                    <p>
                      From
                      <span className="text-sel_blue ml-2">
                        <Link
                          href={`explorer/accounts/${transfer.from.evmAddress}`}
                        >
                          {truncateMiddle(transfer.from.evmAddress, 20)}
                        </Link>
                        <span className="px-2 text-gray-400">To</span>
                        <Link href="#" className="truncate">
                          {truncateMiddle(transfer.to.evmAddress, 20)}
                        </Link>
                      </span>
                    </p>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    Value
                  </td>
                  <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                    {`${
                      transfer.amount ? ConvertBigNumber(transfer.amount) : "-"
                    } ${transfer.symbol}`}
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    Type
                  </td>

                  <td className="text-sm px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-2 bg-primary rounded-3xl">
                      {transfer.type ? transfer.type : "-"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
};

export default TransferDetails;
