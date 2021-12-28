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
    getTokenBalance(faucetAddress).then((balance) => {
      setBalance(balance);
    });

    // @TODO: make subscribing to changes something that happens only after claiming, and unsubscribe after it's updated and some time has passed
    // Staying subscribed to events uses request quota on Alchemy because the client is polling
    // onTokenTransfer(faucetAddress, () => {
    //   getTokenBalance(faucetAddress).then((balance) => {
    //     setBalance(balance);
    //   });
    // });
  }, []);

  return balance;
};

export default useFaucetBalance;
