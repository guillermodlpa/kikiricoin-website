import { useState, useEffect } from 'react';

import { getTokenBalance, onTokenTransfer } from '../../util/web3api';

const useFaucetBalance = () => {
  const [balance, setBalance] = useState<string | undefined>(undefined);

  useEffect(() => {
    const faucetAddress = process.env.NEXT_PUBLIC_KIKIRICOIN_FAUCET_ADDRESS;
    if (!faucetAddress) {
      console.warn('No faucetAddress');
      return;
    }
    onTokenTransfer(faucetAddress, () => {
      getTokenBalance(faucetAddress).then((balance) => {
        setBalance(balance);
      });
    });
  }, []);

  return balance;
};

export default useFaucetBalance;
