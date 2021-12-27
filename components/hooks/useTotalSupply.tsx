import { useState, useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';

import KikiriCoinABI from '../../abis/KikiriCoinABI.json';

const useTotalSupply = () => {
  const [totalSupply, setTotalSpply] = useState<string>('0');

  useEffect(() => {
    const networkUrl = process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK_URL;
    const tokenAdress = process.env.NEXT_PUBLIC_KIKIRICOIN_TOKEN_ADDRESS;

    if (!networkUrl) {
      console.warn('No networkUrl');
      return;
    }
    if (!tokenAdress) {
      console.warn('No tokenAdress');
      return;
    }

    const customHttpProvider = new ethers.providers.JsonRpcProvider(networkUrl);
    const contract = new ethers.Contract(tokenAdress, KikiriCoinABI, customHttpProvider);
    contract.totalSupply().then((result: BigNumber) => {
      setTotalSpply(result.toString());
    });
  }, []);

  return totalSupply;
};

export default useTotalSupply;
