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
import { Theme, invert, light, system, useThemeState } from "@/app/theme";
import { ChevronDown, Menu, MoonIcon, Search, SunIcon } from "lucide-react";
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
      { item: "ERC-20 Tokens", link: "/evm/contracts?filter=ERC20" },
      { item: "ERC-721 Tokens", link: "/evm/contracts?filter=ERC721" },
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
  const [theme, setTheme] = useThemeState();
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
                  <Dropdown placement="bottom-start" className="bg-current">
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
                    <DropdownMenu variant="flat" disallowEmptySelection>
                      {data.dropdown.map((x) => (
                        <DropdownItem key="text">
                          <Link
                            href={x.link}
                            // dark: was not working
                            className={
                              light(theme) ? "text-gray-500" : "text-gray-300"
                            }
                          >
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
                className="font-medium border-1"
                color="secondary"
                radius="md"
                size="sm"
                variant="bordered"
                onClick={() => setTheme(invert(theme))}
              >
                {light(theme) ? (
                  <MoonIcon className="w-4 h-4" color={textColor} />
                ) : (
                  <SunIcon className="w-4 h-4" color={textColor} />
                )}
              </Button>
              <Button
                className={`text-${textColor} font-medium border-1`}
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
                onClick={() => {
                  setNet(net == Network.Main ? Network.Test : Network.Main);
                }}
              >
                {net == Network.Main ? "Mainnet" : "Testnet"}
              </Button>
            </NavbarItem>
          </NavbarContent>

          <NavbarMenuToggle className=" text-gray md:hidden mx-2" />
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
