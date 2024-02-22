"use client";

import * as React from "react";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import timeAgo from "@/lib/ConvertTime";
import { gql, useQuery } from "@apollo/client";
import { Card, CardBody } from "@nextui-org/react";
import { Check, CheckCircle, Copy } from "lucide-react";
import { BLOCK_BY_HASH, BLOCK_BY_HEIGHT } from "@/graphql/queries";

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
  const { loading, error, data: odata } = useQuery(hash ? BLOCK_BY_HASH : BLOCK_BY_HEIGHT, {
    variables: hash ? { hash: params.id } : { height: Number(params.id) },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("GraphQL error:", error);
    return <p>Error: {error.message}</p>;
  }
  // TODO wrap queries into typed api
  const data = hash ? odata.blockById : odata.blocks[0];

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
                          navigator.clipboard.writeText(data.hash)
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
