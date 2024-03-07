// MAINNET RPC

const referer = "0f2e3541-2e8c-4a34-8558-fcfa396af234";

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
