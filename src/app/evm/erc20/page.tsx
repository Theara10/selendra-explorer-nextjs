'use client';

import React from 'react';

import ERC20TokensTable from '@/components/explorer/ERC20TokensTable';
import ExplorerHeader from '@/components/ExplorerHeader';
import { Card, CardBody } from '@nextui-org/react';

import { columns, users } from '../../../data/evm_contracts';

function ERC20Tokens() {
  return (
    <div className="px-40 mt-6">
      <div className="flex items-center justify-between mb-6">
        <p className="text-2xl w-80">ERC-20 Tokens</p>
        <ExplorerHeader />
      </div>
      <Card>
        <CardBody>
          {/* <ExplorerTable users={users} type={User} columns={columns} /> */}
          {/* <ERC20TokensTable users={users} columns={columns} /> */}
          <h2>Coming Soon!</h2>
        </CardBody>
      </Card>
    </div>
  );
}

export default ERC20Tokens;
