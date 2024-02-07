'use client';

import React from 'react';

import ExplorerHeader from '@/components/ExplorerHeader';
import { Card, CardBody, Tab, Tabs } from '@nextui-org/react';

import { columns, users } from '../../../data/evm_contracts';
import ExplorerTable from '@/components/ExplorerTable';
import Image from 'next/image';

function page() {
  const accounts = [
    { id: 1, title: 'Contract', value: '543254', img: '/smart-contract-icon.png' },
    { id: 2, title: 'Verified Contracts', value: '5254', img: '/verified-contract-icon.png' },
    { id: 3, title: 'WASM Transaction', value: '5254', img:  '/verified-contract-icon.png' },
   
  ];
  return (
    <div className="px-40 mt-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xl w-80">WASM Contracts</p>
        <ExplorerHeader /> 
      </div>
      <div className="flex flex-wrap justify-between gap-3">
        {accounts.map((account) => (
          <Card className="w-[32%] p-2" key={account.id}>
            <CardBody className="flex flex-row gap-3">
              <Image  width={52} height={52} src={account.img} alt='account-img' />
              <div className="flex flex-col">
                <p className="text-sm  text-default-500">{account.title}</p>
                <p className="text-lg">{account.value}</p>
              </div>
            </CardBody>
          </Card>
        ))}
        
      </div>
      <Card className="mt-4">
        <CardBody>
        <Tabs aria-label="Options" variant="underlined" color='primary'>
        <Tab key="contracts" title="Contracts">
        <ExplorerTable users={users} columns={columns}  />
        </Tab>
        <Tab key="verified" title="Verified Contracts">
        <ExplorerTable users={users} columns={columns}  />
        </Tab>
        
      </Tabs>
         
        </CardBody>
      </Card>
    </div>
  );
}

export default page;
