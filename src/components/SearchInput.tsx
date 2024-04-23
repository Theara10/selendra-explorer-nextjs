import { Button, Input } from "@nextui-org/react";
import { Search } from "lucide-react";
import { RedirectType, redirect } from "next/navigation";
import React, { useState } from "react";

function SearchInput() {
  let [shr, sr] = useState(false);
  let [txt, st] = useState("");
  if (shr && txt && /^(?:0x)?[a-f0-9]+/.test(txt))
    redirect(`/address/${txt}`, RedirectType.push);
  return (
    <Input
      type="text"
      placeholder="Search by Address / Txn Hash / Block / Token"
      labelPlacement="outside"
      size="lg"
      radius="md"
      className="w-[300px] md:w-[700px] text-sm"
      classNames={{
        input: [""],
        inputWrapper: ["px-1"],
      }}
      fullWidth={true}
      id="inpt"
      onKeyDown={(x) => {
        if (x.key == "Enter") {
          sr(true);
        }
      }}
      onChange={(x) => st(x.target.value)}
      endContent={
        <Button
          isIconOnly
          color="primary"
          aria-label="Like"
          onClick={() => sr(true)}
        >
          <Search />
        </Button>
      }
    />
  );
}

export default SearchInput;
