import { useState, useEffect, useCallback } from 'react';
import { BigNumber, ethers } from 'ethers';

import KikiriCoinABI from '../../abis/KikiriCoinABI.json';
import KikiriFaucetABI from '../../abis/KikiriFaucetABI.json';

type UseConnectedAccountReturn = [string | undefined, Function];

const useConnectedAccount = (account: string | undefined): UseConnectedAccountReturn => {
  const [balance, setBalance] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (account) {
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
      const provider = new ethers.providers.JsonRpcProvider(networkUrl);
      const readOnlyContract = new ethers.Contract(tokenAdress, KikiriCoinABI, provider);
      readOnlyContract
        .balanceOf(account)
        .then((result: BigNumber) => {
          setBalance(result.toString());
        })
        .catch((error: Error) => console.error(error));
    } else {
      setBalance(undefined);
    }
  }, [account]);

  const claim = useCallback(() => {
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
    if (!account) {
      console.warn('No account');
      return;
    }
    const customHttpProvider = new ethers.providers.JsonRpcProvider(networkUrl);
    const signer = customHttpProvider.getSigner(account);
    const contract = new ethers.Contract(faucetAddress, KikiriFaucetABI, signer);
    contract.claim().then(() => {
      console.log('Claimed!');
    });
  }, [account]);

  return [balance, claim];
};

export default useConnectedAccount;
