"use client";

import * as React from "react";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";

import ExplorerHeader from "@/components/ExplorerHeader";
import timeAgo from "@/lib/ConvertTime";
import { gql, useQuery } from "@apollo/client";
import { Card, CardBody } from "@nextui-org/react";
import { Check, CheckCircle, Copy } from "lucide-react";

const BLOCK_BY_ID = gql`
  query BlockByID($id: String!) {
    blockById(id: $id) {
      id
      validator
      hash
      specVersion
      timestamp
      height
      parentHash
      extrinsicsCount
      eventsCount
      callsCount
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

const BlockPage: React.FC<BlockPageProps> = () => {
  const params = useParams();
  console.log("params", params.id);

  const { loading, error, data } = useQuery(BLOCK_BY_ID, {
    // variables: { id: params.id },
    variables: { id: params.id },
  });

  if (loading) return <p>Loading...</p>;
  if (error) {
    console.error("GraphQL error:", error);
    return <p>Error: {error.message}</p>;
  }
  console.log("block-by-id", data.blockById);

  return (
    <div className="px-4 sm:px-20 lg:px-60 h-full">
      <div className="flex items-center justify-between my-6">
        <p className="text-2xl w-80">
          Blocks{" "}
          <span className="text-gray-400"># {data.blockById.height}</span>
        </p>
        <ExplorerHeader />
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
                    {data.blockById.timestamp}
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Block Time
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {timeAgo(data.blockById.timestamp)}
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
                    {data.blockById.hash}
                    <span>
                      <Copy
                        size="16px"
                        color="gray"
                        className="cursor-pointer"
                        onClick={() =>
                          navigator.clipboard.writeText(data.blockById.hash)
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
                    <Link href="#" className="whitespace-normal">
                      {data.blockById.parentHash}
                    </Link>
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Extrinsics Count
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {data.blockById.extrinsicsCount}
                  </td>
                </tr>

                <tr className="bg-white border-b">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Event Count
                  </td>
                  <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {data.blockById.eventsCount}
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
                      <span>{data.blockById.validator}</span>
                      <span>
                        <Copy
                          size="16px"
                          color="gray"
                          onClick={() =>
                            navigator.clipboard.writeText(
                              data.blockById.validator
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
                    {data.blockById.specVersion}
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
