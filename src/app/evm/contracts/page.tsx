"use client";

import React, { useState } from "react";
import colorLib from "@kurkle/color";
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  Filler,
  LinearScale,
  CategoryScale,
  ScriptableContext,
  TooltipModel,
  TooltipItem,
  ArcElement,
} from "chart.js";
Chart.register(
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  LinearScale,
  CategoryScale
);

import { Pie } from "react-chartjs-2";

import ExplorerTable from "@/components/ExplorerTable";
import { Card, CardBody, CardFooter, Tab, Tabs } from "@nextui-org/react";
import dynamic from "next/dynamic";
const Odometer = dynamic(() => import("react-odometerjs"), {
  ssr: false,
  loading: () => <div>0</div>,
});
import "../../blocks/odo.css";
import { columns } from "../../data/evm_contracts";
import { FileCheck2, FileBadge, PieChart } from "lucide-react";
import { get_evm_contracts } from "@/graphql/queries";
import { Contract, Type } from "@/graphql/types";
import PaginationControls from "@/components/PaginationControls";
import { useSearchParams } from "next/navigation";
import { light, useThemeState } from "@/app/theme";

function EvmContracts() {
  const accounts = [
    {
      id: 1,
      title: "Contract",
      value: 0,
      img: <FileCheck2 size={30} color="#00A4E5" />,
    },
    // {
    //   id: 2,
    //   title: "Verified Contracts",
    //   value: null,
    //   img: <FileBadge size={30} color="#00A4E5" />,
    // },
    // {
    //   id: 3,
    //   title: "ERC-20 Tokens",
    //   value: null,
    //   img: <FileCheck2 size={30} color="#00A4E5" />,
    // },
    // {
    //   id: 1,
    //   title: "EVM Transactions",
    //   value: null,
    //   img: <FileCheck2 size={30} color="#00A4E5" />,
    // },
    // {
    //   id: 2,
    //   title: "EVM Accounts",
    //   value: null,
    //   img: <FileCheck2 size={30} color="#00A4E5" />,
    // },
    // {
    //   id: 3,
    //   title: "ERC-721 Tokens",
    //   value: null,
    //   img: <FileCheck2 size={30} color="#00A4E5" />,
    // },
  ];
  const result = get_evm_contracts();
  let filter = useSearchParams().get("filter");
  let [page, setPage] = useState(1);
  let [theme] = useThemeState();
  let data: Contract[];
  switch (result.state) {
    case "loading": {
      data = [];
      break;
    }
    case "error":
      return <p>Error...</p>;
    case "ok":
      data = result.data;
  }
  if (filter) {
    data = data.filter((x) => x.type == filter);
  }
  let count: Record<Type, number> = {} as any;
  let m = 0;
  data.forEach((x) => {
    count[x.type] ? (count[x.type] += 1) : (count[x.type] = 1);
    m = Math.max(m, count[x.type]);
  });
  accounts[0].value = data.length;
  let pal = ["#ed1576", "#f0c90a", "#03a9f4"]; //  #4609d6, #d65b09
  function pick(hover: boolean, { parsed }: { parsed: number }): string {
    if (!parsed) return pal[2];
    let c = pal[Math.round(parsed / (m / (pal.length - 1)))];
    return colorLib(c)
      .alpha(hover ? 0.7 : 1 /*Math.abs(parsed / m)*/)
      .rgbString();
  }
  return (
    <div className="px-4 sm:px-20 md:px-40 lg:px-40 mt-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xl w-80">{filter ?? "EVM"} Contracts</p>
        <></>
      </div>
      <section className="flex flex-wrap justify-between">
        {accounts.map((account) => (
          <Card className="w-[49%] p-2" key={account.id}>
            <CardBody className="flex flex-row gap-1 md:gap-3">
              <div className="w-16 h-16 bg-primary bg-opacity-20 rounded-full flex justify-center items-center">
                {account.img}
              </div>

              <div className="flex flex-col">
                <p className="text-sm  text-default-500">{account.title}</p>
                <p className="text-lg">
                  {account.value !== null && account.value !== undefined ? (
                    <span>{<Odometer value={account.value} />}</span>
                  ) : (
                    <span>-</span>
                  )}
                </p>
              </div>
            </CardBody>
          </Card>
        ))}
        {filter ? (
          <></>
        ) : (
          <Card className="w-[49%] p-2" key="pie">
            <CardBody className="flex flex-row gap-1 md:gap-3">
              <div className="flex flex-col" style={{ maxWidth: 96 }}>
                <p style={{ position: "absolute", float: "right" }}></p>
                <Pie
                  data={{
                    labels: Object.keys(count),
                    datasets: [{ data: Object.values(count) }],
                  }}
                  options={{
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false },
                      tooltip: {
                        displayColors: false,
                        backgroundColor: light(theme)
                          ? "#ffffff80"
                          : "#00000080",
                        titleColor: light(theme) ? "black" : "white",
                        bodyColor: light(theme) ? "black" : "white",
                        bodyFont: { family: "monospace" },
                        titleFont: { family: "monospace" },
                        callbacks: {
                          title: (data) => {
                            return (
                              data[0].parsed +
                              // " " +
                              // data[0].label +
                              " contracts"
                            );
                          },
                          label: (x) => x.label,
                        },
                      },
                    },
                    borderColor: light(theme) ? "black" : "white",
                    elements: {
                      arc: {
                        backgroundColor: pick.bind(false, false),
                        hoverBackgroundColor: pick.bind(true, true),
                      },
                    },
                  }}
                />
              </div>
            </CardBody>
          </Card>
        )}
      </section>
      <Card className="mt-4">
        <CardBody>
          <Tabs aria-label="Options" variant="underlined" color="primary">
            <Tab key="contracts" title="Contracts">
              <ExplorerTable
                users={data.slice((page - 1) * 20, page * 20)}
                columns={columns}
              />
            </Tab>
            <Tab key="verified" title="Verified Contracts">
              {/* <ExplorerTable users={users} columns={columns} /> */}
              <h2>No contracts</h2>
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
      <Card>
        <CardFooter>
          <PaginationControls
            max={data.length / 20}
            currentPage={page}
            onPageChange={setPage}
          />
        </CardFooter>
      </Card>
    </div>
  );
}

export default EvmContracts;
