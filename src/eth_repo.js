import Web3 from "web3";
import * as ethRpc from "./rpc.js";

const web3 = new Web3(ethRpc.ethRPC.nodeUrl);

export const checkEthBalance = (address) => {
  return new Promise((resolve, reject) => {
    web3.eth
      .getBalance(address)
      .then((balanceWei) => {
        const balanceEther = web3.utils.fromWei(balanceWei, "ether");
        resolve(balanceEther); 
      })
      .catch((error) => {
        reject(error);
      });
  });
};
