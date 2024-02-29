import BigNumber from "bignumber.js";
import { Twisters } from "twisters";
import * as acc from "./src/account.js";
import { checkNearBalance } from "./src/near_repo.js";
import { checkEthBalance } from "./src/eth_repo.js";

const [nearAccountId, nearPrivateKey] = [
  acc.nearAccountMainnetID,
  acc.nearAccountMainnetPK,
];

const twisters = new Twisters();
let ethExecuted = 1;
let nearExecuted = 1;
const interval = 3; //interval list in sec

export const getNearWalletBalance = () => {
  return new Promise((resolve, reject) => {
    checkNearBalance(nearAccountId, nearPrivateKey)
      .then(({ balance, account }) => {
        twisters.put(nearAccountId, {
          text: `
Account : ${nearAccountId}
Connection Information 
Network ID : ${account.connection.networkId}
Provider : ${account.connection.provider.connection.url}
Signer : ${Object.keys(account.connection.signer.keyStore.keys).join(", ")}

NEAR account balance Information
Total : ${BigNumber(balance.total).dividedBy(1e24)} NEAR
State Staked : ${BigNumber(balance.stateStaked).dividedBy(1e24)} NEAR
Staked : ${BigNumber(balance.staked).dividedBy(1e24)} NEAR
Available : ${BigNumber(balance.available).dividedBy(1e24)} NEAR
Executed : ${nearExecuted}
`,
        });
        resolve();
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        reject(error);
      });
  });
};

export const getEthWalletBalance = () => {
  return new Promise((resolve, reject) => {
    checkEthBalance(acc.ethAddress)
      .then((balance) => {
        twisters.put(acc.ethAddress, {
          text: `
Account : ${acc.ethAddress}
ETH Balance : ${balance} ETH
Executed : ${ethExecuted}
`,
        });
        resolve();
      })
      .catch((error) => {
        console.error("Error occurred:", error);
        reject(error);
      });
  });
};

const handleInterrupt = () => {
  console.log("User interrupted. Exiting...");
  process.exit(0);
};
process.on("SIGINT", handleInterrupt);

(async () => {
  try {
    while (true) {
      try {
        if (
          (acc.nearAccountMainnetID != "") &
          (acc.nearAccountMainnetPK != "")
        ) {
          await getNearWalletBalance();
          nearExecuted += 1;
        }
        if (acc.ethAddress != "") {
          await getEthWalletBalance();
          ethExecuted += 1;
        }
      } catch (error) {
        console.error("Error occurred ", error);
      }
      await new Promise((resolve) => setTimeout(resolve, interval * 1000));
    }
  } catch (error) {
    console.error("Unexpected error occurred ", error);
  } finally {
    process.removeListener("SIGINT", handleInterrupt);
  }
})();
