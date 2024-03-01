import { AxelarQueryAPI, CHAINS, Environment } from "@axelar-network/axelarjs-sdk";

const axelarQuery = new AxelarQueryAPI({
    environment: Environment.TESTNET,
    axelarLcdUrl: "https://rest.axelar-testnet.lava.build/lava-referer-108a0618-bc05-4d10-8889-045720a7e9d0/",
    axelarRpcUrl: "https://tm.axelar-testnet.lava.build/lava-referer-108a0618-bc05-4d10-8889-045720a7e9d0/"
});

const fee = await axelarQuery.getTransferFee(
    CHAINS.TESTNET.OSMOSIS,
    CHAINS.TESTNET.AVALANCHE,
    "uausdc",
    1000000
);
// returns  { fee: { denom: 'uausdc', amount: '150000' } }
console.log("Fee : ", fee);