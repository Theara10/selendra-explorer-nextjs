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
      title: 'Contract',
      value: '543254',
      img: '/smart-contract-icon.png',
    },
  ];
  return (
    <div className="px-40 mt-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-xl w-80">WASM Contracts</p>
        <ExplorerHeader />
      </div>
      <div className="flex flex-wrap justify-between gap-3">
        {accounts.map((account) => (
          <Card className="w-full p-2" key={account.id}>
            <CardBody className="flex flex-row justify-between gap-3">
              <div className="flex gap-2 items-center">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <p className="text-2xl ">WASM Contracts</p>
                    <div className="flex flex-row gap-2 ml-2">
                      <Image
                        src="/input-wasm.png"
                        width={20}
                        height={20}
                        alt="wasm input"
                      />
                      <Image
                        src="/salt-wasm.png"
                        width={20}
                        height={20}
                        alt="wasm input"
                      />
                      <Image
                        src="/code-wasm.png"
                        width={20}
                        height={20}
                        alt="wasm input"
                      />
                      {/* <Tooltip showArrow={true} content="Code"><Button><Image
                        src="/code-wasm.png"
                        width={20}
                        height={20}
                        alt="wasm input"
                      /></Button></Tooltip> */}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-400 mt-2">
                      W4nkYFBsNiygXTWwgtnwu4WNPj6KFGLrBXu5JqZRsxDR3M
                    </p>
                    <Image
                      src="/copy.png"
                      width={10}
                      height={10}
                      alt="copy.png"
                    />
                  </div>
                </div>
              </div>
              <div className="flex gap-12 text-sm">
                <div>
                  <p className="font-semibold">
                    Owner:
                    <span className="font-normal ml-2 text-sel_blue">
                      W4nkYFBsNiygXTWwgtnwu4WNPj6KFGLrBXu5JqZRsxDR3M
                    </span>
                  </p>
                  <p className="font-semibold">
                    Code Hash:{' '}
                    <span className="font-normal ml-2">
                      0x50bdec....d7aea032
                    </span>{' '}
                  </p>
                  <p className="font-semibold">
                    Deposit: <span className="font-normal ml-2">0ASTR</span>
                  </p>
                </div>
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
