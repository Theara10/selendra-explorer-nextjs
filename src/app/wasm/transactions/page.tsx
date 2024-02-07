'use client';

import React from 'react';

import ExplorerHeader from '@/components/ExplorerHeader';
import ExplorerTable from '@/components/ExplorerTable';
import { Card, CardBody } from '@nextui-org/react';

import { columns, users } from '../../../data/evm_contracts';

function page() {
  return (
    <div className="px-40 mt-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-2xl">WASM Transactions</p>
        <ExplorerHeader />
      </div>
      <Card>
        <CardBody>
          <ExplorerTable users={users} columns={columns} />
        </CardBody>
      </Card>
    </div>
  );
}

export default page;
