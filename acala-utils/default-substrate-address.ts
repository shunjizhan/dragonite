import { computeDefaultSubstrateAddress } from "@acala-network/eth-providers";

(async () => {
  const addr = '0x0085560b24769dAC4ed057F1B2ae40746AA9aAb6';
  const res = computeDefaultSubstrateAddress(addr);
  console.log(res);
})();
