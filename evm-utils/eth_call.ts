import { parseUnits, Interface } from 'ethers/lib/utils';
import ACAABI from '@acala-network/contracts/build/contracts/Token.json';
import ADDRESS from '@acala-network/contracts/utils/Address';
import axios from 'axios';

const RPC_URL = process.env.RPC_URL || 'ws://127.0.0.1:8545';
const RPC_URL2 = process.env.RPC_URL2 || 'ws://127.0.0.1:8546';
const rpcGet =
  (
    method: string // eslint-disable-line
  ) =>
    (params: any): any =>
      axios.get(RPC_URL, {
        data: {
          id: 0,
          jsonrpc: '2.0',
          method,
          params
        }
      });

const rpcGet2 =
  (
    method: string // eslint-disable-line
  ) =>
    (params: any): any =>
      axios.get(RPC_URL2, {
        data: {
          id: 0,
          jsonrpc: '2.0',
          method,
          params
        }
      });

const eth_call = rpcGet('eth_call');
const eth_blockNumber = rpcGet('eth_blockNumber');
const eth_getBlockTransactionCountByNumber = rpcGet('eth_getBlockTransactionCountByNumber');
const eth_getBlockTransactionCountByNumber2 = rpcGet2('eth_getBlockTransactionCountByNumber');

// eth_getBlockTransactionCountByNumber
// eth_getCode
// eth_call
// eth_getBalance
// eth_getBlockTransactionCountByNumber
// eth_getBlockTransactionCountByNumber
// eth_getStorageAt
// eth_getBlockTransactionCountByNumber
// eth_getBlockTransactionCountByNumber
(async () => {
    const res1 = await eth_getBlockTransactionCountByNumber([553678]);
    const res2 = await eth_getBlockTransactionCountByNumber2([553678]);
})();

// eth_getBlockTransactionCountByNumber
// eth_getBlockTransactionCountByNumber

//     # 自动找不到，return tx hash not found
// eth_getTransactionByHash
// eth_getTransactionReceipt







/* ------------------------- iface ------------------------- */

// const iface = new Interface(ACAABI.abi);

// // const funcs = ACAABI.abi.filter(a => a.type === 'function' && a.inputs.length === 0).map(x => x.name);
// const funcs = [
//   'symbol',
//   // 'decimals',
// ]

// funcs.forEach(async (f) => {
//   const data = iface.encodeFunctionData(f);
//   const blockNumber = (await eth_blockNumber()).data.result;
//   const res = (await eth_call([{
//     to: ADDRESS.ACA,
//     data,
//   }, blockNumber])).data.result;
//   console.log(f, data, res)
// });

// name 0x06fdde03
// symbol 0x95d89b41
// decimals 0x313ce567
// totalSupply 0x18160ddd

/* ------------------------------------------------------------ */