import { useState, useMemo } from 'react';
import { ethers } from 'ethers';

const useBlockNumber = () => {
  const [blockNumber, setBlockNumber] = useState<number>();
  const customHttpProvider = useMemo(
    () => new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK_URL),
    []
  );
  customHttpProvider.getBlockNumber().then((result) => setBlockNumber(result));
  return blockNumber;
};

export default useBlockNumber;
