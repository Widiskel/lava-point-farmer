// MAINNET RPC

const referer = "108a0618-bc05-4d10-8889-045720a7e9d0";

export const nearMainnetRPC = {
  networkId: "mainnet",
  nodeUrl:
    `https://near.lava.build/lava-referer-${referer}/`, //lava near mainnet rpc
  // nodeUrl: 'https://rpc.mainnet.near.org',  // this is rpc for near mainnet
  walletUrl: "https://wallet.mainnet.near.org",
  helperUrl: "https://helper.mainnet.near.org",
};

export const ethRPC = {
  nodeUrl:
    `https://eth1.lava.build/lava-referer-${referer}/`,
}
export const evmosRPC = {
  nodeUrl:
    `https://evmos.lava.build/lava-referer-${referer}/`,
}
export const strkRPC = {
  nodeUrl:
  `https://rpc.starknet.lava.build/lava-referer-${referer}/`,
}

export const axlRPC = {
  axelarLcdUrl: `https://rest.axelar-testnet.lava.build/lava-referer-${referer}/`,
  axelarRpcUrl: `https://tm.axelar-testnet.lava.build/lava-referer-${referer}/`
}
