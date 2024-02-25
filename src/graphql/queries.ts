/* eslint-disable react-hooks/rules-of-hooks */
import { QueryResult, gql, useQuery } from '@apollo/client';
import { GraphQLErrors } from '@apollo/client/errors';
import { Account, Block, Contract, Extrinsic, Transfer } from './types';

const BLOCK = `
id
validator
specVersion
timestamp
height
parentHash
extrinsicsCount
eventsCount
callsCount`;

const ACCOUNT = `
id
evmAddress
freeBalance
reservedBalance
totalBalance
updatedAt`;

const TRANSFER = `
blockNumber
amount
from { ${ACCOUNT} }
to { ${ACCOUNT} }
timestamp
id
success
symbol`;

const CONTRACT = `account
id
extrinsicHash
name
symbol
timestamp
type`;

function map_contract({ id, name, symbol, extrinsicHash, account, timestamp, type }: {
  id: string;
  name: string;
  symbol: string;
  extrinsicHash: string;
  account: string;
  timestamp: string;
  type: string;
}): Contract {
  return {
    id,
    name,
    symbol,
    extrinsicHash,
    account,
    block: Number(timestamp),
    type: <any>type,
  }
}

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
  errors?: GraphQLErrors;
  error?: string;
}

function flatten<T>(t: Result<Result<T>>): Result<T> {
  switch (t.state) {
    case "loading": return t
    case "error": return t
    case "ok": switch (t.data.state) {
      case "loading": return { state: "loading" }
      case "error": return { state: "error", message: t.data.message }
      case "ok": return { state: "ok", data: t.data.data }
    }
  }
}

function and_then<T, U>(t: Result<T>, f: (x: T | undefined) => Result<U>): Result<U> {
  switch (t.state) {
    // hooks must be called
    case "loading": { f(undefined); return t };
    case "error": { f(undefined); return t };
    case "ok": return f(t.data);
  }
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

export function get_transactions(since: Date): Result<Date[]> {
  return map_query(useQuery(gql`
    query LastMonth($since: DateTime!) {
      transfers(where: {timestamp_gt: $since}) {
        timestamp
      }
    }`, { variables: { since } }), y => y.transfers.map((x: { timestamp: string }) => new Date(x.timestamp)))
}

export function get_latest_blocks(limit: number, offset: number = 0): Refreshable<Block[]> {
  return map_refreshable(
    useQuery(gql`
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
  `, { variables: { limit, offset } }),
    (y) => y.blocks
  )
}

export function get_evm_contracts(): Result<Contract[]> {
  return map_query(useQuery(gql`
    query evmContracts {
      evmContracts(orderBy: timestamp_DESC) {
        ${CONTRACT}
      }
    }`), (x) => x.evmContracts.map(map_contract))
}

export function get_latest_extrinsics(limit: number, offset: number = 0): Refreshable<Extrinsic[]> {
  return map_refreshable(useQuery(gql`
    query GetLastestExtrinsics($limit: Int, $offset: Int) {
      extrinsics(limit: $limit, offset: $offset, orderBy: timestamp_DESC) {
        id
        extrinsicHash
        timestamp
        success
        fee
        version
        tip
        block {
          ${BLOCK}
        }
        blockNumber
      }
    }
  `, { variables: { limit, offset } }), y => y.extrinsics)
}

export function get_account_native_contracts(id: string): Result<Contract[]> {
  // TODO make `account` a `Account` instead of just the evmAddress
  return and_then(get_account_by_native_address(id), x => get_account_evm_contracts(x?.evmAddress))
}

export function get_account_evm_contracts(id: string | undefined): Result<Contract[]> {
  return map_query(useQuery(gql`
    query AccountContractsEvm($id: String!) {
      evmContracts(where: {account_eq: $id}) {
         ${CONTRACT}
      }
    }`, { variables: { id } }), y => y.evmContracts.map(map_contract))
}

export function get_account_transactions(id: string): Result<Transfer[]> {
  return map_query(useQuery(gql`
    query AccountTx($id: String!) {
      transfers(where: {
        to: {id_eq: $id},
        OR: {from: {id_eq: $id}}
        AND: {from: {evmAddress_not_eq: "0x0000000000000000000000000000000000000000"}}
      }, orderBy: timestamp_DESC) {
        ${TRANSFER}
      }
    }`,
    { variables: { id } }), x => x.transfers)
}

export function get_latest_transactions(n: number): Result<Transfer[]> {
  return map_query(useQuery(gql`
    query GetLatestTransactions($n: Int!) {
      transfers(limit: $n, orderBy: timestamp_DESC) {
        ${TRANSFER}
      }
    }`,
    { variables: { n } }), (y) => y.transfers)
}

export function get_accounts(): Result<Account[]> {
  return map_query(useQuery(gql`
    query Accounts {
      accounts {
        ${ACCOUNT}
      }
    }
  `), x => x.accounts)
}

/** checks for a 0x prefix to determine whether this is a native or evm address. */
export function get_account(address: string): Result<Account> {
  return address.startsWith("0x") ? get_account_by_evmaddress(address) : get_account_by_native_address(address)
}

/** checks for a 0x prefix to determine whether this is a native or evm address. */
export function get_account_contracts(address: string): Result<Contract[]> {
  return address.startsWith("0x") ? get_account_evm_contracts(address) : get_account_native_contracts(address)
}

export function get_account_by_native_address(address: string): Result<Account> {
  return map_query(useQuery(gql`
  query AccountByID($address: String!) {
    accountById(id: $address) {
      ${ACCOUNT}
    }
  }
`, { variables: { address } }), y => y.accountById)
}

export function get_account_by_evmaddress(address: string): Result<Account> {
  return map_query(useQuery(gql`
  query AccountByEVM($address: String!) {
    accounts(where: {evmAddress_eq: $address}) {
      ${ACCOUNT}
    }
}
`, { variables: { address } }), y => y.accounts[0])
}




export function counts(): Refreshable<number> {
  return map_refreshable(useQuery(gql`
    query Count {
      itemsCounters(limit: 1, orderBy: total_DESC) { total }
    }
  `), (y) => y.itemsCounters[0].total)
}

export function block_by_hash(hash: string): Result<Block> {
  return map_query(useQuery(gql`
    query BlockByHash($hash: String!) {
      blockById(id: $hash) {
        ${BLOCK}
      }
    }`, { variables: { hash } }),
    (y) => y.blockById)
}


export function block_by_height(height: number): Result<Block> {
  return map_query(useQuery(gql`
    query BlockByHeight($height: Int!) {
      blocks(where: { height_eq: $height }) {
        ${BLOCK}
      }
    }`, { variables: { height } }),
    (y) => y.blocks[0]);
}

export function evm_contract_by_id(id: string): Result<Contract> {
  return map_query(useQuery(gql`
    query evmContractById($id: String!) {
      evmContractById(id: $id) {
        ${CONTRACT}
      }
    }`,
    { variables: { id } }),
    y => y.evmContractById
  )
}


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

export function transfer_by_hash(hash: string): Result<Transfer> {
  return map_query(
    useQuery(gql`
      query TransferByID($hash: String!) {
        transferById(id: $hash) {
          ${TRANSFER}
        }
      }`, { variables: { hash } }
    ), y => y.transferById
  )
}

