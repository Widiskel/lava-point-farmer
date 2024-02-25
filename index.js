import fs from "fs";
import { KeyPair, keyStores, connect } from "near-api-js";
import { rpc } from "./src/rpc.js";
import BigNumber from "bignumber.js";
import { Twisters } from "twisters";

const accountFile = fs.readFileSync("./src/account.txt", "utf-8")
const [accountId, privateKey] = accountFile.split("|");

const twisters = new Twisters();
let executed = 1;
const interval = 5; //interval list in sec
const getAccount = (accountId, privateKey) =>
  new Promise(async (resolve, reject) => {
    try {
      const keyStore = new keyStores.InMemoryKeyStore();
      const keyPair = KeyPair.fromString(privateKey);
      await keyStore.setKey(rpc.networkId, accountId, keyPair);

      const connectionConfig = {
        deps: {
          keyStore,
        },
        ...rpc,
      };

      const accountConnection = await connect(connectionConfig);
      const account = await accountConnection.account(accountId);

      resolve(account);
    } catch (error) {
      reject(error);
    }
  });

const getNearBalance = async (accountId, privateKey) => {
  const account = await getAccount(accountId, privateKey);
  const balance = await account.getAccountBalance();
  return { balance, account };
};

export const getWalletBalance = () => {
  return new Promise((resolve, reject) => {
    getNearBalance(accountId, privateKey)
      .then(({ balance, account }) => {
        twisters.put(accountId, {
          text: `
Account : ${accountId}
Connection Information 
Network ID : ${account.connection.networkId}
Provider : ${account.connection.provider.connection.url}
Signer : ${Object.keys(account.connection.signer.keyStore.keys).join(", ")}

NEAR account balance Information
Total : ${BigNumber(balance.total).dividedBy(1e24)} NEAR
State Staked : ${BigNumber(balance.stateStaked).dividedBy(1e24)} NEAR
Staked : ${BigNumber(balance.staked).dividedBy(1e24)} NEAR
Available : ${BigNumber(balance.available).dividedBy(1e24)} NEAR
Executed : ${executed}
`,
        });
        executed += 1;

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
        await getWalletBalance();
      } catch (error) {
        console.error("Error occurred ", error);
      }
      await new Promise(resolve => setTimeout(resolve, interval * 1000));
    }
  } catch (error) {
    console.error("Unexpected error occurred ", error);
  } finally {
    process.removeListener("SIGINT", handleInterrupt);
  }
})();