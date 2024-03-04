import BigNumber from "bignumber.js";
import { Twisters } from "twisters";
import * as acc from "./src/account.js";
import { checkNearBalance } from "./src/near_repo.js";
import { checkEthBalance } from "./src/eth_repo.js";
import { checkEvmosBalance } from "./src/evmos_repo.js";
import { checkSTRKBalance } from "./src/strk_repo.js"
import { checkAXLBalance } from "./src/axl_repo.js"

const [nearAccountId, nearPrivateKey] = [
  acc.nearAccountMainnetID,
  acc.nearAccountMainnetPK,
];

const twisters = new Twisters();
let ethExecuted = 1;
let nearExecuted = 1;
//turn off evmos because RPC paused
//let evmosExecuted = 1;
let strkExecuted = 1;
let axlExecuted = 1;
const interval = 30; //interval list in sec

export const getNearWalletBalance = () => {
  return new Promise((resolve, reject) => {
    checkNearBalance(nearAccountId, nearPrivateKey)
      .then(({ balance, account }) => {
        twisters.put(nearAccountId, {
          text: `
== NEAR account balance Information ==
Account : ${nearAccountId}
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
    checkEthBalance(acc.ethEvmosAddress)
      .then((balance) => {
        twisters.put(acc.ethEvmosAddress, {
          text: `
== Ethereum account balance Information ==
Account : ${acc.ethEvmosAddress}
ETH Balance : ${balance}
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

export const getSTRKWalletBalance = () => {
  return new Promise((resolve, reject) => {
    checkSTRKBalance(acc.strkContractAddress, acc.strkAddress)
      .then((balance) => {
        twisters.put(acc.strkAddress + "STRK", {
          text: `
== STRK account balance Information ==
Account : ${acc.strkAddress}
STRK Balance : ${balance}
Executed : ${strkExecuted}
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

export const getAXLFee = () => {
  return new Promise((resolve, reject) => {
    checkAXLBalance()
      .then((fee) => {
        twisters.put("AXL", {
          text: `
== AXL Farm Connect To RPC ==
fee : ${JSON.stringify(fee)}
Executed : ${axlExecuted}
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

export const getEvmosWalletBalance = () => {
  return new Promise((resolve, reject) => {
    checkEvmosBalance(acc.ethEvmosAddress)
      .then((balance) => {
        twisters.put(acc.ethEvmosAddress + "evmos", {
          text: `
== EVMOS account balance Information ==
Account : ${acc.ethEvmosAddress}
EVMOS Balance : ${balance}
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
          await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
        }
        if (acc.ethEvmosAddress != "") {
          await getEthWalletBalance();
          ethExecuted += 1;
          await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
          // await getEvmosWalletBalance();
          // evmosExecuted += 1;
        }
        if (acc.strkAddress != "" && acc.strkContractAddress != "") {
          await getSTRKWalletBalance();
          strkExecuted += 1;
          await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
        }
        await getAXLFee();
        axlExecuted += 1;
        await new Promise((resolve) => setTimeout(resolve, 5 * 1000));
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
