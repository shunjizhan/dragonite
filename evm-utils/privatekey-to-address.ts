import { Wallet } from 'ethers';

const privateKey = '0xa872f6cbd25a0e04a08b1e21098017a9e6194d101d75e13111f71410c59cd57f';
const wallet = new Wallet(privateKey);
const address = wallet.address;
const pubKey = wallet.publicKey;

console.log({
  address,
  pubKey,
});
