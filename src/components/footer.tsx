"use client";
import React from "react";

import Image from "next/image";
import Link from "next/link";
import { useThemeState, light } from "@/app/theme";

export default function Footer() {
  return (
    <div
      className="px-10 sm:px-40 py-10 mt-12"
      style={{
        backgroundColor: light(useThemeState()[0]) ? "#F4F4F5" : "#181818",
      }}
    >
      <div className="self-stretch flex w-full justify-between gap-5 items-start max-md:max-w-full max-md:flex-wrap pt-4 ">
        <div className="flex grow basis-[0%] flex-col items-start">
          <div className="flex items-center">
            <Image
              src="/sel-logo-blue.png"
              alt="logo-dark"
              width={500}
              height={500}
              className="h-12 w-auto"
            />
            <p className="pl-2 text-xl">Powered by Selendra</p>
          </div>
          <div className="text-base leading-6 self-stretch mt-6 w-[300px] md:w-[500px]">
            Selendra Scan is a block explorer and analytics tool for the
            Selendra Network, a smart contract platform for enterprise and
            developer adoption in Southeast Asia.
          </div>
        </div>
        <div className="flex items-stretch justify-between gap-5 mt-2 max-md:max-w-full max-md:flex-wrap">
          <div className="flex grow basis-[0%] flex-col items-stretch">
            <div className="text-xl font-bold whitespace-nowrap">About Us</div>
            <div className="text-base whitespace-nowrap mt-4">
              <Link href="/privacy">Privacy Policies</Link>
            </div>
            <div className="text-base whitespace-nowrap mt-2">
              <Link href="/term">Terms and Conditions</Link>
            </div>
          </div>
          <div className="flex grow basis-[0%] flex-col items-stretch self-start">
            <div className="text-xl font-bold whitespace-nowrap">Community</div>
            <div className="text-neutral-500 text-base whitespace-nowrap mt-4">
              <Link href="https://t.me/selendranetwork" target="_blank">
                <Image
                  src="/telegram-logo.png"
                  width={500}
                  height={500}
                  alt="sel-logo"
                  className="h-12 w-auto"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
