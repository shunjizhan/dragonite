import { formatEther } from "ethers/lib/utils";

export const formatEthCallResult = (decodedData: any): string => {
  let res = decodedData;
  if (res._isBigNumber) {
    res = formatEther(res.toBigInt());
  }

  return res;
};
