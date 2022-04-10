import { calcEthereumTransactionParams, calcSubstrateTransactionParams } from '@acala-network/eth-providers';
import { ApiPromise, WsProvider } from '@polkadot/api';
import { MANDALA_NODE_URL } from './consts';

(async () => {
  const wsProvider = new WsProvider(MANDALA_NODE_URL);
  const api = await ApiPromise.create({ provider: wsProvider });

  const storageByteDeposit = (api.consts.evm.storageDepositPerByte).toString();
  const txFeePerGas = (api.consts.evm.txFeePerGas).toString();
  // const blockNumber = (await api.rpc.chain.getHeader()).number.toNumber();
  const blockNumber = 1000000;

  console.log({
    storageByteDeposit,
    txFeePerGas,
  })

  const { txGasPrice, txGasLimit } = calcEthereumTransactionParams({
    gasLimit: 1000010,
    validUntil: blockNumber + 100,
    storageLimit: 640010,
    txFeePerGas,
    storageByteDeposit,
  });

  console.log({
    txGasPrice: txGasPrice.toNumber(),
    txGasLimit: txGasLimit.toNumber(),
  });

  const { gasLimit, validUntil, storageLimit } = calcSubstrateTransactionParams({
    txGasPrice: txGasPrice,
    txGasLimit: txGasLimit,
    storageByteDeposit,
    txFeePerGas,
  });

  console.log(txGasPrice.toNumber(), txGasLimit.toNumber())
  console.log({
    gasLimit: gasLimit.toNumber(),
    validUntil: validUntil.toNumber(),
    storageLimit: storageLimit.toNumber(),
  });

  await api.disconnect();
})();

// { txGasPrice: 200.007877610, txGasLimit: 33064010 }