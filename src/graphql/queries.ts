import { gql } from '@apollo/client';

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
      hash
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


export const COUNTS = gql`
  query Count {
    itemsCounters(limit: 1, orderBy: total_DESC) {
      total
    }
  }
`;


export const BLOCK_BY_ID = gql`
  query BlockByID($id: String!) {
    blockById(id: $id) {
      id
      validator
      hash
      specVersion
      timestamp
      height
      parentHash
      extrinsicsCount
      eventsCount
      callsCount
    }
  }
`;

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