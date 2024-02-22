/* eslint-disable react-hooks/rules-of-hooks */
import { map } from '@/lib/utils';
import { QueryResult, gql, useQuery, ApolloQueryResult } from '@apollo/client';
import { GraphQLErrors } from '@apollo/client/errors';

export type Ok<T> = {
  data: T;
  state: "ok";
}

export type Loading = {
  state: "loading";
}

export type Error = {
  state: "error";
  message: string,
}


export type Errors = {
  state: "error";
  errors?: GraphQLErrors,
  error?: string,
}

type Result<T> = Ok<T> | Loading | Error;

export type Refreshable<T> = {
  result: Result<T>,
  refresh: () => Promise<Ok<T> | Loading | Errors>;
}

function map_query<T, U>(q: QueryResult<T>, f: (y: T) => U): Result<U> {
  if (q.loading) return { state: "loading" }
  if (q.error) return { state: "error", message: q.error.message }
  return { state: "ok", data: f(q.data!) }
}

function map_refreshable<T, U>(q: QueryResult<T>, f: (y: T) => U): Refreshable<U> {
  return {
    result: map_query(q, f),
    refresh: async () => {
      const r = await q.refetch();
      if (r.loading) return <any>{ state: "loading" };
      if (r.error || r.errors) return { state: "error", errors: r.errors, error: r.error };
      return { state: "ok", data: f(r.data!) };
    }
  };
}

export const GET_LAST_MONTHS_TRANSACTIONS = gql`
query LastMonth($t: DateTime!) {
  transfers(where: {timestamp_gt: $t}) {
    timestamp
  }
}`;

export const GET_LATEST_BLOCKS = gql`
  query GetLatestBlocks($limit: Int, $offset: Int) {
    blocks(limit: $limit, offset: $offset, orderBy: timestamp_DESC) {
      eventsCount
      id
      timestamp
      extrinsicsCount
      height
      validator
    }
  }
`;

export const GET_EVM_CONTRACTS = gql`
  query evmContracts {
    evmContracts {
      account
      id
      extrinsicHash
      timestamp
      type
    }
  }
`;


export const GET_LATEST_EXTRINSICS = gql`
  query GetLastestExtrinsics($limit: Int, $offset: Int) {
    extrinsics(limit: $limit, offset: $offset, orderBy: block_timestamp_DESC) {
      id
      extrinsicHash
      timestamp
      success
      fee
      block {
        height
        id
      }
      blockNumber
    }
  }
`;

export const GET_LATEST_TRANSACTIONS = gql`
query GetLatestTransactions {
  transfers(limit: 10, orderBy: timestamp_DESC) {
    blockNumber
    amount
    from {
      evmAddress
    }
    to {
      evmAddress
    }
    timestamp
    id
    success
  symbol
  }
}
`;


export const GET_ACCOUNTS = gql`
  query Accounts {
    accounts {
      evmAddress
      freeBalance
      id
      totalBalance
      updatedAt
      reservedBalance
    }
  }
`;


export const ACCOUNT_BY_ID = gql`
  query AccountByID($id: String!) {
    accountById(id: $id) {
      id
      evmAddress
      freeBalance
      reservedBalance
      totalBalance
      updatedAt
    }
  }
`;


export function counts(): Refreshable<number> {
  return map_refreshable(useQuery(gql`
    query Count {
      itemsCounters(limit: 1, orderBy: total_DESC) { total }
    }
  `), (y) => y.itemsCounters[0].total)
}

export type Block = {
  eventsCount: number;
  callsCount: number;
  id: string;
  specVersion: number;
  timestamp: string;
  extrinsicsCount: number;
  height: number;
  validator: string;
  parentHash: string;
};

export function block_by_hash(hash: string): Result<Block> {
  return map_query(useQuery(gql`
    query BlockByHash($hash: String!) {
      blockById(id: $hash) {
        id
        validator
        specVersion
        timestamp
        height
        parentHash
        extrinsicsCount
        eventsCount
        callsCount
      }
    }`, { variables: { hash } }),
    (y) => y.blockById)
}

export function block_by_height(height: number): Result<Block> {
  return map_query(useQuery(gql`
    query BlockByHeight($height: Int!) {
      blocks(where: { height_eq: $height }) {
        id
        validator
        specVersion
        timestamp
        height
        parentHash
        extrinsicsCount
        eventsCount
        callsCount
      }
    }`, { variables: { height } }),
    (y) => y.blocks[0]);
}

export const EVM_CONTRACT_BY_ID = gql`
  query evmContractById($id: String!) {
    evmContractById(id: $id) {
      account
      extrinsicHash
      id
      timestamp
      type
    }
  }
`;


export const GET_EXTRINSICS_BY_ID = gql`
  query ExtrinsicById($id: String!) {
    extrinsicById(id: $id) {
      timestamp
      extrinsicHash
      blockNumber
      fee
      tip
      version
      success
      signerPublicKey
      indexInBlock
      events {
        eventName
      }
      calls {
        callName
      }
      block {
        height
        id
      }
    }
  }
`;


export const TRANSFER_BY_ID = gql`
query TransferByID($id: String!) {
  transferById(id: $id) {
    amount
    blockNumber
    extrinsicHash
    id
    timestamp
    symbol
    success
    type
    from {
      evmAddress
      id
    }
    to {
      evmAddress
      id
    }
  }
}
`;