"use client";

import React from "react";

import { Card, CardBody } from "@nextui-org/react";
import { redirect, useParams } from "next/navigation";
import {
  block_by_hash,
  evm_contract_by_id,
  extrinsic_by_hash,
  transfer_by_hash,
  Result,
  select,
} from "@/graphql/queries";
import { HashLoader } from "react-spinners";

function Page() {
  let id: any = useParams().id;
  console.log(id);
  let result: Result<any> | undefined = select([
    block_by_hash(id),
    transfer_by_hash(id),
    evm_contract_by_id(id),
    extrinsic_by_hash(id),
  ] as any);
  console.log(result);
  if (result === undefined) {
    return (
      <div className="px-20 mt-6">
        <Card>
          <CardBody> unfortunately there are no results</CardBody>
        </Card>
      </div>
    );
  }
  switch (result.state) {
    case "loading":
      return (
        <HashLoader
          size={150}
          style={{ alignContent: "center" }}
          color={"#00A3E4"}
        />
      );
    case "error":
      return (
        <Card>we had an error processing your request: {result.message}</Card>
      );
    case "ok":
  }
  console.log(result);
  switch ((result.data as any).__typename) {
    case "Block":
      console.log("ZOOM!");
      return redirect(`/blocks/${id}`);
    case "Transfer":
      return redirect(`/tx/${id}`);
    case "EvmContract":
      return redirect(`/evm/contracts/${id}`);
    case "Extrinsic":
      return redirect(`/extrinsics/${id}`);
  }
  return <></>;
}

export default Page;
