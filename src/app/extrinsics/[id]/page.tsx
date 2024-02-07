"use client";

import * as React from "react";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import ExplorerHeader from "@/components/ExplorerHeader";
import timeAgo from "@/lib/ConvertTime";
import { gql, useQuery } from "@apollo/client";
import { Card, CardBody } from "@nextui-org/react";
import { CheckCircle, Copy } from "lucide-react";

const GET_EXTRINSICS_BY_ID = gql`
  query ExtrinsicById($id: String!) {
    extrinsicById(id: $id) {
      timestamp
      extrinsicHash
      blockNumber
      fee
      tip
      version
      success
      signerPublicKey
      indexInBlock
      events {
        eventName
      }
      calls {
        callName
      }
      block {
        height
        id
      }
    }
  }
`;

export default function ExtrinsicPage() {
  const params = useParams();
  const { loading, error, data } = useQuery(GET_EXTRINSICS_BY_ID, {
    variables: { id: params.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("GraphQL error:", error);
    return <p>Error: {error.message}</p>;
  }
  const extrinsic = data.extrinsicById;
  console.log("block-by-id", data.extrinsicById);

  return (
    <div className=" px-60">
      <div className="flex items-center justify-between my-6">
        <p className="text-2xl w-80">
          Extrinsics <span className="text-gray-400">#358952502</span>
        </p>
        <ExplorerHeader />
      </div>
      <Card>
        <CardBody>
          <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full">
                <tbody>
                  <tr className="border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Timestamp
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {extrinsic.timestamp}
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Block Time
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {timeAgo(extrinsic.timestamp)}
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Block Number
                    </td>
                    <td className=" flex items-center gap-2 text-sm text-sel_blue font-light px-6 py-4 whitespace-nowrap">
                      {extrinsic.blockNumber}
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Extrinsics Hash
                    </td>
                    <td className=" flex items-center gap-2 text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {extrinsic.extrinsicHash}
                      <span>
                        <Copy
                          size="16px"
                          color="gray"
                          className="cursor-pointer"
                          onClick={() =>
                            navigator.clipboard.writeText(
                              extrinsic.extrinsicHash
                            )
                          }
                        />
                      </span>
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Parent Hash
                    </td>
                    <td className="text-sm font-light px-6 py-4 whitespace-nowrap">
                      <Link href="#">
                        {extrinsic.parentHash ? extrinsic.parentHash : "-"}
                      </Link>
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Call
                    </td>
                    <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                      <Link
                        href="#"
                        className="px-3 py-2 text-white bg-primary rounded-3xl"
                      >
                        {extrinsic.calls.map(
                          (call: { callName: string }, index: number) => (
                            <span key={index}>{call.callName}</span>
                          )
                        )}
                      </Link>
                    </td>
                  </tr>

                  <tr className="bg-white border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Fee
                    </td>
                    <td className="  text-sm  font-light px-6 py-4 whitespace-nowrap">
                      {extrinsic.fee ? extrinsic.fee : "-"}
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Tip
                    </td>
                    <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                      {extrinsic.tip ? extrinsic.tip : "-"}
                    </td>
                  </tr>
                  <tr className="bg-white border-b">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Signer Public key
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {extrinsic.signerPublicKey
                        ? extrinsic.signerPublicKey
                        : "-"}
                    </td>
                  </tr>
                  <tr className="bg-white ">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Event
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {extrinsic.events.eventName
                        ? extrinsic.events.eventName
                        : "-"}
                    </td>
                  </tr>
                  <tr className="bg-white ">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Version
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {extrinsic.version}
                    </td>
                  </tr>
                  <tr className="bg-white ">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Result
                    </td>
                    <td className="text-sm text-gray-900 font-light py-4 whitespace-nowrap">
                      <td className=" flex items-center gap-2 text-sm text-gray-900 font-light px-6 whitespace-nowrap">
                        <span>
                          <CheckCircle size={16} color="green" />
                        </span>
                        Success
                      </td>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
