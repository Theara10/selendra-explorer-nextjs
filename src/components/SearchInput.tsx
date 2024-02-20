import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
} from "@nextui-org/react";
import { ChevronDown, Search } from "lucide-react";
import React from "react";

function SearchInput() {
  return (
    <Input
      type="text"
      placeholder="Search by Address / Txn Hash / Block / Token / Ens"
      labelPlacement="outside"
      size="lg"
      radius="md"
      className="w-[300px] md:w-[700px] text-sm"
      classNames={{
        input: [""],
        inputWrapper: ["px-1"],
      }}
      fullWidth={true}
      startContent={
        <>
          <Dropdown placement="bottom-start">
            <DropdownTrigger>
              <Button className="capitalize pl-6  bg-transparent border-r-2">
                Filter
                <span>
                  <ChevronDown />
                </span>
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
            >
              <DropdownItem key="text">Addresses</DropdownItem>
              <DropdownItem key="number">Tokens</DropdownItem>
              <DropdownItem key="date">Name Tags</DropdownItem>
              <DropdownItem key="single_date">Label</DropdownItem>
              <DropdownItem key="iteration">Website</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </>
      }
      endContent={
        <Button isIconOnly color="primary" aria-label="Like">
          <Search />
        </Button>
      }
    />
  );
}

export default SearchInput;
