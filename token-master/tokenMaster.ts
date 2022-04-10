import { parseUnits, Interface } from 'ethers/lib/utils';
import axios from 'axios';
import { RPC_URL_ASTAR, RPC_URL_ETH, RPC_URL_LOCAL8545 } from './consts';
import { erc20ABI } from './erc20ABI';
import { formatEthCallResult } from './utils';

const RPC_URL = RPC_URL_ASTAR;
const rpcGet = (method: string) =>
  (params: any): any =>
    axios.post(RPC_URL, {
      id: 0,
      jsonrpc: '2.0',
      method,
      params
    });

const eth_call = rpcGet('eth_call');
const eth_blockNumber = rpcGet('eth_blockNumber');

/* ------------------------- iface ------------------------- */
const iface = new Interface(erc20ABI);

const funcNames = [
  'name',        // 0x06fdde03
  'symbol',      // 0x95d89b41
  'totalSupply', // 0x18160ddd
  'decimals',    // 0x313ce567
];

const targetTokens = [
  '0xB9dEDB74bd7b298aBf76b9dFbE5b62F0aB05a57b',
];

(async () => {
  const blockNumber = (await eth_blockNumber()).data.result;
  console.log({ blockNumber })

  targetTokens.map(async addr => {
    const tokenInfo = {};

    const allP = funcNames.map(async f => {
      const data = iface.encodeFunctionData(f);

      const res = await eth_call([{
        to: addr,
        data,
      }, blockNumber]);

      const decodedData = iface.decodeFunctionResult(f, res.data.result)[0];

      tokenInfo[f] = formatEthCallResult(decodedData);
    });

    await Promise.all(allP);

    console.log(tokenInfo);
  });
})();

/* ------------------------------------------------------------ */