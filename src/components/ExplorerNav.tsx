import React, { useState } from "react";

import { usePathname } from "next/navigation";

import { EXPLORERNAV_ITEMS, SIDENAV_ITEMS } from "@/constants";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Link,
  Navbar,
  NavbarContent,
  NavbarItem,
  NavbarBrand,
} from "@nextui-org/react";
import { ChevronDown, Menu, Search } from "lucide-react";
import { SideNavItem } from "@/types";
import Image from "next/image";

const explorer_nav_items = [
  {
    id: 1,
    name: "Blockchain",

    dropdown: [
      { item: "Blocks", link: "/blocks" },
      { item: "Extrinsics", link: "/extrinsics" },
      { item: "Transfers", link: "/transfers" },
      { item: "Events", link: "#" },
      { item: "Account", link: "/accounts" },
    ],
  },
  {
    id: 2,
    name: "EVM",
    dropdown: [
      { item: "Transactions", link: "/evm/transactions" },
      { item: "Contracts", link: "/evm/contracts" },
      { item: "ERC-20 Tokens", link: "/evm/erc20" },
      { item: "ERC-721 Tokens", link: "/evm/erc721" },
    ],
  },
  {
    id: 3,
    name: "WASM",
    dropdown: [
      { item: "Transactions", link: "/wasm/transactions" },
      { item: "Contracts", link: "/wasm/contracts" },
      { item: "ERC-20 Tokens", link: "/wasm/erc20" },
      { item: "ERC-721 Tokens", link: "/wasm/erc721" },
    ],
  },
];
function ExplorerNav() {
  return (
    <section>
      <div className="bg-image h-64 w-full flex items-center flex-col">
        <Navbar
          className="bg-transparent w-full px-4 flex items-center justify-evenly"
          isBlurred={false}
          classNames={{
            wrapper: " px-0",
          }}
        >
          {/* <div></div>
          <NavbarContent className="flex sm:hidden " justify="center">
            <NavbarItem>
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Link className="text-white border rounded-md p-1" href="#">
                    <Menu size="20px" />
                  </Link>
                </DropdownTrigger>
                <DropdownMenu
                  variant="faded"
                  aria-label="Dropdown menu with icons"
                >
                  <DropdownItem isReadOnly key="new" className="flex flex-col">
                    {" "}
                    <div className="flex flex-col space-y-2  md:px-6 ">
                      {EXPLORERNAV_ITEMS.map((item, idx) => {
                        return <MenuItem key={idx} item={item} />;
                      })}
                    </div>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          </NavbarContent> */}

          <NavbarBrand>
            <Image
              src="/sel-logo-blue.png"
              width={500}
              height={500}
              alt="sel-logo"
              className="h-12 w-auto"
            />
            {/* <p className="font-bold text-inherit text-white"></p> */}
          </NavbarBrand>

          <NavbarContent className="hidden sm:flex " justify="center">
            <NavbarItem>
              <Link className="text-white" href="#">
                Home
              </Link>
            </NavbarItem>
            {explorer_nav_items.map((data) => (
              <NavbarItem key={data.id}>
                <Link className="text-white" href="#">
                  <Dropdown placement="bottom-start">
                    <DropdownTrigger>
                      <Button className="capitalize bg-transparent border-none text-medium text-white">
                        {data.name}
                        <span>
                          <ChevronDown />
                        </span>
                      </Button>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Single selection example"
                      variant="flat"
                      disallowEmptySelection
                      // selectionMode="single"
                      // selectedKeys={selectedKeys}
                      // onSelectionChange={setSelectedKeys}
                    >
                      {data.dropdown.map((x) => (
                        <DropdownItem key="text">
                          <Link href={x.link} className="text-gray-500">
                            {x.item}
                          </Link>
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  </Dropdown>
                </Link>
              </NavbarItem>
            ))}
          </NavbarContent>
        </Navbar>

        <h1 className="text-white text-3xl text-center md:text-4xl font-bold mt-4">
          Selendra Blockchain Explorer
        </h1>

        <Input
          type="text"
          placeholder="Search by Address / Txn Hash / Block / Token / Ens"
          labelPlacement="outside"
          size="lg"
          radius="md"
          className="mt-8 px-6 md:px-60 lg:px-[600px]"
          classNames={{
            input: [""],
            // innerWrapper: ["px-0"],
            inputWrapper: ["px-0"],
          }}
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
                  // selectionMode="single"
                  // selectedKeys={selectedKeys}
                  // onSelectionChange={setSelectedKeys}
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
            // <div>
            <Button
              isIconOnly
              color="primary"
              aria-label="Like"
              className="mr-1"
            >
              {/* <HeartIcon /> */}
              <Search />
            </Button>
            // </div>
          }
        />
      </div>
    </section>
  );
}

export default ExplorerNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (
    <div className="">
      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}
            className={`flex flex-row items-center p-2 rounded-lg hover-bg-zinc-100 w-full justify-between hover:bg-zinc-100 ${
              pathname.includes(item.path) ? "bg-zinc-100" : ""
            }`}
          >
            <div className="flex flex-row space-x-4 items-center">
              <span className="font-semibold text-xl  flex">{item.title}</span>
            </div>

            <div className={`${subMenuOpen ? "rotate-180" : ""} flex`}>
              <ChevronDown />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${
                      subItem.path === pathname ? "font-bold" : ""
                    }`}
                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}
          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 ${
            item.path === pathname ? "bg-zinc-100" : ""
          }`}
        >
          <span className="font-semibold text-xl flex">{item.title}</span>
        </Link>
      )}
    </div>
  );
};
