'use client';

import React from 'react';

import Image from 'next/image';

import ExplorerHeader from '@/components/ExplorerHeader';
import ExplorerTable from '@/components/ExplorerTable';
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';

import { columns, users } from '../../../../data/evm_contracts';

function page() {
  const accounts = [
    {
      id: 1,
      title: 'Tbong Token',
      value: '0xb28ed315d3272a998619932ef94e04a',
      img: '/smart-contract-icon.png',
    },
  ];

  const tokenInfo = [
    { id: 1, title: 'Symbol', value: 'TBT' },
    { id: 2, title: 'Decimals', value: 23 },
    { id: 3, title: 'Holder', value: 23525 },
    {id: 4, title: 'Total Supply', value: 2325525 },
  ];
  return (
    <div className="px-40 mt-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xl w-80">Token Details</p>
        <ExplorerHeader />
      </div>
      <div className="flex flex-wrap justify-between gap-3">
        {accounts.map((account) => (
          <Card className="w-full p-2" key={account.id}>
            <CardBody className="flex flex-row justify-between gap-3">
              <div className="flex gap-2 items-center">
                <Image
                  width={52}
                  height={52}
                  src={account.img}
                  alt="account-img"
                />
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p className="text-xl ">{account.title}</p>
                    <p className="bg-primary text-white text-xs px-2 py-1 rounded-xl">
                      ERC-20
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-400">{account.value}</p>
                    <Image
                      src="/copy.png"
                      width={10}
                      height={10}
                      alt="copy.png"
                    />
                  </div>
                </div>
              </div>
              <div className='flex gap-12'>
                {tokenInfo.map((data) => (
                  <div key={data.id}>
                    <p className="text-gray-400">{data.title}</p>
                    <p>{data.value}</p>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
      <Card className="mt-4">
        <CardBody>
          <Tabs aria-label="Options" variant="underlined" color="primary">
            <Tab key="contracts" title="Contracts">
              <ExplorerTable users={users} columns={columns} />
            </Tab>
            <Tab key="verified" title="Verified Contracts">
              <ExplorerTable users={users} columns={columns} />
            </Tab>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}

export default page;
