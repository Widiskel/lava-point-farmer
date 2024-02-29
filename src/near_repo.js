import { KeyPair, keyStores, connect } from "near-api-js";
import  * as nearRpc from "./rpc.js";

export const getAccount = (accountId, privateKey) =>
  new Promise(async (resolve, reject) => {
    try {
      const keyStore = new keyStores.InMemoryKeyStore();
      const keyPair = KeyPair.fromString(privateKey);
      await keyStore.setKey(nearRpc.nearMainnetRPC.networkId, accountId, keyPair);

      const connectionConfig = {
        deps: {
          keyStore,
        },
        ...nearRpc.nearMainnetRPC,
      };

      const accountConnection = await connect(connectionConfig);
      const account = await accountConnection.account(accountId);

      resolve(account);
    } catch (error) {
      reject(error);
    }
  });

export const checkNearBalance = async (accountId, privateKey) => {
  const account = await getAccount(accountId, privateKey);
  const balance = await account.getAccountBalance();
  return { balance, account };
};
