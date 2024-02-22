"use client";

import * as React from "react";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import timeAgo from "@/lib/ConvertTime";
import { Card, CardBody } from "@nextui-org/react";
import { CheckCircle, Copy } from "lucide-react";
import { block_by_hash, block_by_height } from "@/graphql/queries";
import { Block } from "@/graphql/types";

/**
 * Interface for the props passed to the BlockPage component.
 * Contains the route params with the block ID.
 */
interface BlockPageProps {
  params: {
    id: string;
  };
}

const BlockPage: React.FC<BlockPageProps> = () => {
  const params: { id: string } = useParams();
  const hash = params.id.startsWith("0x");
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const result = hash ? block_by_hash(params.id) : block_by_height(Number(params.id));
  let data: Block;
  // match at home
  switch (result.state) {
    case "loading": return <p>Loading...</p>
    case "error": return <p>Error: {result.message}</p>
    case "ok": data = result.data;
  }

  return (
    <div className="px-4 h-full">
      <div className="flex items-center justify-between my-6">
        <p className="text-md md:text-2xl w-80">
          Blocks{" "}
          <span className="text-gray-400"># {data.height}</span>
        </p>
        <></>
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
                    {data.timestamp}
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Block Time
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {timeAgo(data.timestamp)}
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Status
                  </td>
                  <td className=" flex items-center gap-2 text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <span>
                      <CheckCircle color="green" size="16px" />
                    </span>
                    Finalized
                  </td>
                </tr>

                <tr className="bg-white border-b">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    Hash
                  </td>
                  <td className=" flex items-center gap-2 text-sm text-gray-900 font-light px-6 py-4">
                    {data.id}
                    <span>
                      <Copy
                        size="16px"
                        color="gray"
                        className="cursor-pointer"
                        onClick={() =>
                          navigator.clipboard.writeText(data.id)
                        }
                      />
                    </span>
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Parent Hash
                  </td>
                  <td className="text-sm text-sel_blue font-light px-6 py-4 whitespace-normal">
                    <Link href={`/blocks/${data.parentHash}`} className="whitespace-normal">
                      {data.parentHash}
                    </Link>
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Extrinsics Count
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {data.extrinsicsCount}
                  </td>
                </tr>

                <tr className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Event Count
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {data.eventsCount}
                  </td>
                </tr>

                <tr className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Validator
                  </td>
                  <td className="  text-sm text-sel_blue font-light px-6 py-4 whitespace-nowrap">
                    <Link href="#" className="flex items-center gap-2">
                      <span>
                        <Image
                          src="/profile.png"
                          alt="profile"
                          width={500}
                          height={500}
                          className="w-6 h-6"
                        />
                      </span>
                      <span>{data.validator}</span>
                      <span>
                        <Copy
                          size="16px"
                          color="gray"
                          onClick={() =>
                            navigator.clipboard.writeText(
                              data.validator
                            )
                          }
                        />
                      </span>
                    </Link>
                  </td>
                </tr>

                <tr className="bg-white ">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Specs Version
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {data.specVersion}
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

export default BlockPage;
