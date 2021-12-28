import { useState, useEffect } from 'react';

import { getTokenBalance, onTokenTransfer } from '../../util/web3api';

type UseConnectedAccountReturn = string | undefined;

const useConnectedAccount = (account: string | undefined): UseConnectedAccountReturn => {
  const [balance, setBalance] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (account) {
      getTokenBalance(account).then((balance) => setBalance(balance));
      // Staying subscribed to events uses request quota on Alchemy because the client is polling
      // @TODO: make subscribing to changes something that happens only after claiming, and unsubscribe after it's updated and some time has passed
      // onTokenTransfer(account, () => {
      //   getTokenBalance(account).then((balance) => setBalance(balance));
      // });
    } else {
      setBalance(undefined);
    }
  }, [account]);

  return balance;
};

export default useConnectedAccount;
