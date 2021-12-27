import { useState, useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';

import KikiriCoinABI from '../../abis/KikiriCoinABI.json';

const useFaucetBalance = () => {
  const [balance, setBalance] = useState<string | undefined>(undefined);

  useEffect(() => {
    const networkUrl = process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK_URL;
    const tokenAdress = process.env.NEXT_PUBLIC_KIKIRICOIN_TOKEN_ADDRESS;
    const faucetAddress = process.env.NEXT_PUBLIC_KIKIRICOIN_FAUCET_ADDRESS;

    if (!networkUrl) {
      console.warn('No networkUrl');
      return;
    }
    if (!tokenAdress) {
      console.warn('No tokenAdress');
      return;
    }
    if (!faucetAddress) {
      console.warn('No faucetAddress');
      return;
    }

    const customHttpProvider = new ethers.providers.JsonRpcProvider(networkUrl);
    const contract = new ethers.Contract(tokenAdress, KikiriCoinABI, customHttpProvider);
    contract.balanceOf(faucetAddress).then((result: BigNumber) => {
      setBalance(result.toString());
    });
  }, []);

  return balance;
};

export default useFaucetBalance;
