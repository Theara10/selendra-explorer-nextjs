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
import { CheckCircle, Copy } from "lucide-react";

export const TRANSFER_BY_ID = gql`
query TransferByID($id: String!) {
  transferById(id: $id) {
    amount
    blockNumber
    extrinsicHash
    id
    timestamp
    symbol
    success
    type
    from {
      evmAddress
      id
    }
    to {
      evmAddress
      id
    }
  }
}
`;

/**
 * Interface for the props passed to the BlockPage component.
 * Contains the route params with the block ID.
 */
interface BlockPageProps {
  params: {
    id: string;
  };
}

const TransferDetails: React.FC<BlockPageProps> = () => {
  const params = useParams();
  const id = (params.id as string).startsWith("0x") ? params.id as string : "0x" + params.id;
  console.log("params", id);

  const { loading, error, data } = useQuery(TRANSFER_BY_ID, {
    variables: { id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("GraphQL error:", error);
    return <p>Error: {error.message}</p>;
  }
  const transfer = data.transferById;
  console.log(transfer)

  return (
    <div className="px-4">
      <div className="flex items-center">
        <span className="text-2xl w-[8ch]">Transfer</span><span className="text-gray-400">#{truncateMiddle(transfer.id, 50)}</span>
        {transfer.success ? (<CheckCircle color="green" size="32px" />) : ("-")}
      </div>
      <Card>
        <CardBody>
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <table className="min-w-full">
              <tbody>
                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Timestamp
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {transfer.timestamp}
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Block Time
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {timeAgo(transfer.timestamp)}
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Block Number
                  </td>
                  <td className=" flex items-center gap-2 text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <span>
                      <CheckCircle color="green" size="24px" />
                    </span>
                    {transfer.blockNumber}
                  </td>
                </tr>

                <tr className="bg-white border-b">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Extrinsic Hash
                  </td>
                  <td className=" flex items-center gap-2 text-sm text-gray-900 font-light px-6 py-4">
                    {transfer.extrinsicHash}
                    <span>
                      <Copy
                        size="24px"
                        color="gray"
                        className="cursor-pointer"
                        onClick={() =>
                          navigator.clipboard.writeText(transfer.hash)
                        }
                      />
                    </span>
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Asset Transfer
                  </td>
                  <td className="text-sm font-light px-6 py-4 whitespace-normal">
                    <p>
                      From
                      <span className="text-sel_blue ml-2">
                        <Link href="/explorer/accounts/1">
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
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Value
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {`${ConvertBigNumber(transfer.amount ? transfer.amount : "-")} ${transfer.symbol}`}
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Type
                  </td>

                  <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                    <span className="px-3 py-2 text-white bg-primary rounded-3xl">
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
