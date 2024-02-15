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

const menuItems = [
  "About",
  "Blog",
  "Customers",
  "Pricing",
  "Enterprise",
  "Changelog",
  "Documentation",
  "Contact Us",
];

function ExplorerNav(props: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  return (
    <section>
      <div className="bg-image h-64 w-full flex items-center flex-col">
        <Navbar
          {...props}
          classNames={{
            base: cn("border-default-100", {
              "bg-default-200/50 dark:bg-default-100/50": isMenuOpen,
            }),
            wrapper: "w-full justify-center",
            item: "hidden md:flex",
          }}
          className="bg-white"
          height="60px"
          isMenuOpen={isMenuOpen}
          onMenuOpenChange={setIsMenuOpen}
        >
          {/* Left Content */}
          <NavbarBrand>
            <Image
              width={500}
              height={500}
              src="/sel-logo-text.png"
              alt="sel-logo"
              className="h-8 w-auto"
            />
          </NavbarBrand>

          {/* Center Content */}
          <NavbarContent justify="center">
            <NavbarItem>
              <Link className="text-medium text-gray-500" href="#" size="sm">
                Home
              </Link>
            </NavbarItem>
            {explorer_nav_items.map((data) => (
              <NavbarItem key={data.id}>
                <Link className="text-gray-500" href="#">
                  <Dropdown placement="bottom-start">
                    <DropdownTrigger>
                      <p className="capitalize bg-transparent border-none text-medium text-gray-500 flex items-center gap-1">
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
                className=" border-gray-400 font-medium border-1"
                color="secondary"
                radius="md"
                size="sm"
                variant="bordered"
              >
                <MoonIcon className="w-4 h-4" color="gray" />
              </Button>
              <Button
                className=" border-gray-400 text-gray-400 font-medium border-1"
                color="secondary"
                radius="md"
                size="sm"
                variant="bordered"
                startContent={
                  <Image
                    width={24}
                    height={24}
                    src="/sel-logo-blue.png"
                    alt="sel-logo"
                    className="h-4 w-auto"
                  />
                }
              >
                Mainnet
              </Button>
            </NavbarItem>
          </NavbarContent>

          <NavbarMenuToggle className="text-default-400 md:hidden " />

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
            <NavbarMenuItem className="mb-4">
              <Button
                className=" border-gray-400 text-gray-400 font-medium border-1 w-full"
                color="secondary"
                radius="md"
                size="sm"
                variant="bordered"
                startContent={
                  <Image
                    width={24}
                    height={24}
                    src="/sel-logo-blue.png"
                    alt="sel-logo"
                    className="h-4 w-auto"
                  />
                }
              >
                Mainnet
              </Button>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                className="text-medium text-gray-500 pl-[16px]"
                href="#"
                size="sm"
              >
                Home
              </Link>
            </NavbarMenuItem>
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
            {/* {menuItems.map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  className="mb-2 w-full text-default-500"
                  href="#"
                  size="md"
                >
                  {item}
                </Link>
                {index < menuItems.length - 1 && (
                  <Divider className="opacity-50" />
                )}
              </NavbarMenuItem>
            ))} */}
          </NavbarMenu>
        </Navbar>

        <h1 className="text-white text-3xl text-center md:text-4xl font-bold mt-8">
          Selendra Blockchain Explorer
        </h1>

        <Input
          type="text"
          placeholder="Search by Address / Txn Hash / Block / Token / Ens"
          labelPlacement="outside"
          size="lg"
          radius="md"
          className="mt-8 px-6 md:px-60 lg:px-[600px] text-sm"
          classNames={{
            input: [""],
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
            <Button
              isIconOnly
              color="primary"
              aria-label="Like"
              className="mr-1"
            >
              <Search />
            </Button>
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
