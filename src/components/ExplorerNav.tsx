"use client";

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
  NavbarMenuItem,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarProps,
  Divider,
} from "@nextui-org/react";
import { ChevronDown, Menu, MoonIcon, Search } from "lucide-react";
import { SideNavItem } from "@/types";
import Image from "next/image";
import { cn } from "./cn";
import SearchInput from "./SearchInput";
import { Network, useNetState } from "@/graphql/apollo-client";

const explorer_nav_items = [
  {
    id: 1,
    name: "Blockchain",

    dropdown: [
      { item: "Blocks", link: "/blocks" },
      { item: "Extrinsics", link: "/extrinsics" },
      { item: "Transactions", link: "/tx" },
      // { item: "Events", link: "#" },
      { item: "Account", link: "/accounts" },
    ],
  },
  {
    id: 2,
    name: "EVM",
    dropdown: [
      // { item: "Transactions", link: "/evm/transactions" },
      { item: "Contracts", link: "/evm/contracts" },
      // { item: "ERC-20 Tokens", link: "/evm/erc20" },
      // { item: "ERC-721 Tokens", link: "/evm/erc721" },
    ],
  },
  {
    id: 3,
    name: "WASM",
    dropdown: [
      { item: "Transactions", link: "/wasm/transactions" },
      // { item: "Contracts", link: "/wasm/contracts" },
      // { item: "ERC-20 Tokens", link: "/wasm/erc20" },
      // { item: "ERC-721 Tokens", link: "/wasm/erc721" },
    ],
  },
];

interface Colors {
  bgColor: string;
  textColor: string;
  logo: string;
  search: boolean;
  selIcon: string;
}

function ExplorerNav({ bgColor, textColor, logo, search, selIcon }: Colors) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [net, setNet] = useNetState();
  return (
    <section>
      <div
        className={`bg-image h-64 w-full flex items-center flex-col ${
          search ? "h-64" : "h-auto"
        }`}
      >
        <Navbar
          classNames={{
            base: cn("border-default-100 w-screen", {
              // "bg-default-200/50 dark:bg-default-100/50": isMenuOpen,
            }),
            wrapper: "w-full justify-center px-2",
            item: "hidden md:flex",
          }}
          className={`${bgColor}`}
          height="60px"
          maxWidth="xl"
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
        >
          <NavbarBrand>
            <Link href="/">
              <Image
                width={500}
                height={500}
                src={logo}
                alt="sel-logo"
                className=" h-6 md:h-8 w-auto"
              />
            </Link>
          </NavbarBrand>

          <NavbarContent justify="center">
            <NavbarItem>
              <Link
                className={`text-medium text-${textColor}`}
                href="/"
                size="sm"
              >
                Home
              </Link>
            </NavbarItem>
            {explorer_nav_items.map((data) => (
              <NavbarItem key={data.id}>
                <Link className={`text-${textColor}`} href="#">
                  <Dropdown placement="bottom-start">
                    <DropdownTrigger>
                      <p
                        className={`capitalize bg-transparent border-none text-medium text-${textColor} flex items-center gap-1`}
                      >
                        {data.name}
                        <span>
                          <ChevronDown size={16} />
                        </span>
                      </p>
                    </DropdownTrigger>
                    <DropdownMenu
                      aria-label="Single selection example"
                      variant="flat"
                      disallowEmptySelection
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

          {/* Right Content */}
          <NavbarContent className="hidden md:flex" justify="end">
            <NavbarItem className="ml-2 !flex gap-2">
              <Button
                isIconOnly
                className={`border-${textColor} font-medium border-1`}
                color="secondary"
                radius="md"
                size="sm"
                variant="bordered"
              >
                <MoonIcon className="w-4 h-4" color={textColor} />
              </Button>
              <Button
                className={`border-${textColor} text-${textColor} font-medium border-1`}
                color="secondary"
                radius="md"
                size="sm"
                variant="bordered"
                startContent={
                  <Image
                    width={24}
                    height={24}
                    src={selIcon}
                    alt="sel-logo"
                    className="h-4 w-auto"
                  />
                }
                onClick={() => {setNet(net == Network.Main ? Network.Test : Network.Main)}}
              >
                {net == Network.Main ? "Mainnet" : "Testnet"}
              </Button>
            </NavbarItem>
          </NavbarContent>

          <NavbarMenuToggle className=" text-gray md:hidden mx-2" />

          <NavbarMenu
            className="top-[calc(var(--navbar-height)_-_1px)] max-h-fit bg-white pb-6 pt-6 shadow-medium  "
            motionProps={{
              initial: { opacity: 0, y: -20 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0, y: -20 },
              transition: {
                ease: "easeInOut",
                duration: 0.2,
              },
            }}
          >
            {explorer_nav_items.map((data) => (
              <NavbarMenuItem key={data.id}>
                <Link className="text-white" href="#">
                  <Dropdown placement="bottom-start">
                    <DropdownTrigger>
                      <Button className="capitalize bg-transparent border-none text-medium text-gray-500">
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
              </NavbarMenuItem>
            ))}
          </NavbarMenu>
        </Navbar>

        <div className={search === true ? "flex flex-col" : "hidden"}>
          <h1 className="text-white text-2xl text-center md:text-4xl font-bold my-8">
            Selendra Explorer
          </h1>

          <SearchInput />
        </div>
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
