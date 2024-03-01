import { Account, RpcProvider, Contract, constants, json } from 'starknet';
// initialize provider
const provider = new RpcProvider({ nodeUrl: 'https://rpc.starknet.lava.build/lava-referer-108a0618-bc05-4d10-8889-045720a7e9d0/', });
const contractAddress = '0x04718f5a0Fc34cC1AF16A1cdee98fFB20C31f5cD61D6Ab07201858f4287c938D';
const myAddress = "0x01f78042ca65d29145ba4f54cf0c0631c1f5933c48648beb18e062e31ad642c1";

import fs from 'fs';
const compiledContract = json.parse(fs.readFileSync('./myAbi.json').toString('ascii'));

if (compiledContract == null) {
    const { abi: testAbi } = await provider.getClassAt(contractAddress);
    if (testAbi === undefined) {
        throw new Error('no abi.');
    }
    compiledContract = testAbi;
}

const myTestContract = new Contract(compiledContract, contractAddress, provider);

const bal1 = await myTestContract.balance_of(myAddress);
console.log('STRK balance =', bal1); 
