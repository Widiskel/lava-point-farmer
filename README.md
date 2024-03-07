# LAVA POINT FARMER

LAVA point farmer using Lava RPC.

## Setup
- install nodejs.
- cd to project dir.
- run ```npm install```.
- run ```cp src/account_tmp.js src/account.js``` .
- open ```account.js``` and add ur details (wallet, pk, address) on the fillable ```"here"```. 
- check out the ```src/rpc.js``` change the referer with yout referer. example ```https://near.lava.build/lava-referer-0f2e3541-2e8c-4a34-8558-fcfa396af234/``` look at ```lava-referer-{YOUR REFERER CODE HERE}``` copy and paste the referer from that endpoint.
- if you want to adjust the interval, checkout index.js and find for 
```
const minInterval = 3;
const maxInterval = 10;
```
adjust the time in second
- run ```npm run farm```.

## Note
- this package now support running near, eth, and evmos rpc using your lava custom rpc. this package only check your balance. not doing anything sus or nasty. because the goal is to add more activity using your custom lava rpc.


