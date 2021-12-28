import { useState, useEffect } from 'react';

import { getTokenBalance, onTokenTransfer } from '../../util/web3api';

type UseConnectedAccountReturn = string | undefined;

const useConnectedAccount = (account: string | undefined): UseConnectedAccountReturn => {
  const [balance, setBalance] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (account) {
      onTokenTransfer(account, () => {
        getTokenBalance(account).then((balance) => setBalance(balance));
      });
    } else {
      setBalance(undefined);
    }
  }, [account]);

  return balance;
};

export default useConnectedAccount;