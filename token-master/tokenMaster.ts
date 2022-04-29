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
  '0xB9dEDB74bd7b298aBf76b9dFbE5b62F0aB05a57b',   // VERSA
  '0xDe2578Edec4669BA7F41c5d5D2386300bcEA4678',   // ARSW
  '0x6Df98E5fBfF3041105cB986B9D44c572a43Fcd22',   // NIKA
];

(async () => {
  // const blockNumber = (await eth_blockNumber()).data.result;

  targetTokens.map(async addr => {
    const tokenInfo = {
      address: addr, 
    };

    const allP = funcNames.map(async f => {
      const data = iface.encodeFunctionData(f);

      const res = await eth_call([{
        to: addr,
        data,
      }, 'latest']);

      const decodedData = iface.decodeFunctionResult(f, res.data.result)[0];

      tokenInfo[f] = formatEthCallResult(decodedData);
    });

    await Promise.all(allP);

    console.log(tokenInfo);
  });
})();

/* ------------------------------------------------------------ */