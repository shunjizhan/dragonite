import { getContractAddress } from '@ethersproject/address';
import { computeDefaultEvmAddress } from '@acala-network/eth-providers';

const target = '0xe890d2a93ed344cc8336e0bc2387ff565a3a8f71';

// const from = '0x75e480db528101a381ce68544611c169ad7eb342';
const from = '0x0077014b4C74d9b1688847386B24Ed23Fdf14Be8';
// const from = computeDefaultEvmAddress('5EMjsczjoEZaNbWzoXDcZtZDSHN1SLmu4ArJcEJVorNDfUH3');

for (let i = 0; i < 10; i++) {
  const res = getContractAddress({ from, nonce: i }).toLocaleLowerCase();
  console.log(i, res);
  if (res === target) {
    console.log('find!!!!!!!!!!!!!!!!!!!!!!!')
  }
}

// const res = getContractAddress({ from: '0x75e480db528101a381ce68544611c169ad7eb342', nonce: 9 })
// console.log(res)
