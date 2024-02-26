"use client";

import * as React from "react";

import Link from "next/link";
import { useParams } from "next/navigation";

import timeAgo from "@/lib/ConvertTime";
import { Card, CardBody } from "@nextui-org/react";
import { CheckCircle, Copy, XCircle } from "lucide-react";
import { get_extrinsic_by_hash } from "@/graphql/queries";
import { Extrinsic } from "@/graphql/types";
import truncateMiddle from "@/lib/TruncateMiddle";

export default function ExtrinsicPage() {
  const params: any = useParams().id;
  const result = get_extrinsic_by_hash(params);
  let extrinsic: Extrinsic;
  switch (result.state) {
    case "loading": return <p>loading</p>
    case "error": return <p>error</p>
    case "ok": {
      if (result.data) extrinsic = result.data;
      else return <p>incorrect id</p>;
    }
  }

  return (
    <div className="px-4 sm:px-20 md:px-60 lg:px-80">
      <div className="flex items-center">
        <span className="text-2xl w-[7ch]">Extrinsic</span><span className="text-sel_blue">
          <Link href={`/blocks/${extrinsic.blockNumber}`}>#{extrinsic.blockNumber}</Link>
        </span>
        {extrinsic.success ? (<CheckCircle className="m-2" color="green" size="32px" />) : (<XCircle className="m-2" color="red" size="32px" />)}
      </div>
      <Card>
        <CardBody>
          <div className="">
            <table className="min-w-full">
              <tbody>
                <tr className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Timestamp
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {extrinsic.timestamp}
                    {" | "}
                    {timeAgo(extrinsic.timestamp)}
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Extrinsic Hash
                  </td>
                  <td className="flex items-center gap-2 text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {truncateMiddle(extrinsic.extrinsicHash, 40)}
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
                {/* <tr className="bg-white border-b">
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
                  </tr> */}

                {extrinsic.fee ? <tr className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Fee
                  </td>
                  <td className="  text-sm  font-light px-6 py-4 whitespace-nowrap">
                    {extrinsic.fee}
                  </td>
                </tr> : <></>}
                {extrinsic.tip ? <tr className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Tip
                  </td>
                  <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                    {extrinsic.tip}
                  </td>
                </tr> : <></>}
                {/* <tr className="bg-white border-b">
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
                </tr> */}
              </tbody>
            </table>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
