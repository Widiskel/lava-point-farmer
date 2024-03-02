import { AxelarQueryAPI, CHAINS, Environment } from "@axelar-network/axelarjs-sdk";
import * as axlRPC from "./rpc.js";

const axelarQuery = new AxelarQueryAPI({
    environment: Environment.TESTNET,
    axelarLcdUrl: axlRPC.axlRPC.axelarLcdUrl,
    axelarRpcUrl: axlRPC.axlRPC.axelarRpcUrl
});

export const checkAXLBalance = () => {
    return new Promise((resolve, reject) => {
        axelarQuery.getTransferFee(
            CHAINS.TESTNET.OSMOSIS,
            CHAINS.TESTNET.AVALANCHE,
            "uausdc",
            1000000
        )
        .then((fee) => {
          resolve(fee); 
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

// const fee = await axelarQuery.getTransferFee(
//     CHAINS.TESTNET.OSMOSIS,
//     CHAINS.TESTNET.AVALANCHE,
//     "uausdc",
//     1000000
// );
// console.log("Fee : ", fee);

