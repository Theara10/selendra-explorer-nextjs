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

export type Transfer = {
    id: string;
    name: string;
    symbol: string;
    blockNumber: number;
    timestamp: string;
    extrinsicHash: string,
    amount: number;
    type: "Native" | "ERC20" | "ERC721" | "ERC1155" | "SRC20" | "SRC721" | "SRC1155";
    success: boolean;
    from: Account;
    to: Account;
};


export type Account = {
    id: string;
    evmAddress: string;
    freeBalance: number;
    reservedBalance: number;
    totalBalance: number;
    updatedAt: number;
    // rewards: TODO
    // identity: TODO
    // sub: TODO
};

export type Contract = {
    id: string;
    contract: string;
    name: string;
    symbol: string;
    extrinsicHash: string;
    verified_time: string;
    account: string;
};

export type Extrinsic = {
    timestamp: string;
    extrinsicHash: string;
    blockNumber: number;
    fee?: number;
    success: boolean;
    height: number;
    block: Block;
    tip?: number;
    version: string;
};