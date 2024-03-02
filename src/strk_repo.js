import fs from 'fs';
import { RpcProvider, Contract, json } from 'starknet';
import * as strkRPC from "./rpc.js";
import { promisify } from 'util';

// const provider = new RpcProvider({ nodeUrl: strkRPC.strkRPC.nodeUrl, });

const readFileAsync = promisify(fs.readFile);

async function getBal1(contractAddress, myAddress, provider=new RpcProvider({ nodeUrl: strkRPC.strkRPC.nodeUrl, })) {
    let compiledContract = null;

    try {
        const data = await readFileAsync('./myAbi.json');
        compiledContract = json.parse(data.toString('ascii'));
    } catch (error) {
        const { abi: testAbi } = await provider.getClassAt(contractAddress);
        if (testAbi === undefined) {
            throw new Error('no abi.');
        }
        compiledContract = testAbi;
    }

    const myTestContract = new Contract(compiledContract, contractAddress, provider);
    const bal1 = await myTestContract.balance_of(myAddress);

    return bal1;
}

export const checkSTRKBalance = (contractAddress, myAddress, provider) => {
    return new Promise((resolve, reject) => {
      getBal1(contractAddress,myAddress,provider)
        .then((bal1) => {
          resolve(bal1); 
        })
        .catch((error) => {
          reject(error);
        });
    });
  };

// const compiledContract = json.parse(fs.readFileSync('./myAbi.json').toString('ascii'));

// if (compiledContract == null) {
//     const { abi: testAbi } = await provider.getClassAt(contractAddress);
//     if (testAbi === undefined) {
//         throw new Error('no abi.');
//     }
//     compiledContract = testAbi;
// }

// const myTestContract = new Contract(compiledContract, contractAddress, provider);

// const bal1 = await myTestContract.balance_of(myAddress);
// console.log('STRK balance =', bal1); 
