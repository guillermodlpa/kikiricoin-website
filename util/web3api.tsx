import { createAlchemyWeb3 } from '@alch/alchemy-web3';
import { AbiItem } from 'web3-utils/types';

import KikiriCoinABI from './ABI/KikiriCoinABI.json';
import KikiriFaucetABI from './ABI/KikiriFaucetABI.json';

if (!process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK_URL) {
  throw new Error('No process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK_URL');
}
if (!process.env.NEXT_PUBLIC_KIKIRICOIN_TOKEN_ADDRESS) {
  throw new Error('No process.env.NEXT_PUBLIC_KIKIRICOIN_TOKEN_ADDRESS');
}
if (!process.env.NEXT_PUBLIC_KIKIRICOIN_FAUCET_ADDRESS) {
  throw new Error('No process.env.NEXT_PUBLIC_KIKIRICOIN_FAUCET_ADDRESS');
}

export const web3 = createAlchemyWeb3(process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK_URL);
const tokenContract = new web3.eth.Contract(
  KikiriCoinABI as AbiItem[],
  process.env.NEXT_PUBLIC_KIKIRICOIN_TOKEN_ADDRESS
);
const faucetContract = new web3.eth.Contract(
  KikiriFaucetABI as AbiItem[],
  process.env.NEXT_PUBLIC_KIKIRICOIN_FAUCET_ADDRESS
);

export const claimTokensFromFaucet = async (address: string) => {
  if (!address) {
    return Promise.reject(new Error('No address'));
  }
  return faucetContract.methods
    .claim()
    .send({ from: address })
    .then(() => {
      console.log('%cWeb3', 'background: orange; color: white', `claim`);
    });
};

export const getTokenBalance = (account: string): Promise<string> =>
  tokenContract.methods
    .balanceOf(account)
    .call()
    .then((result: number) => {
      const value = result.toString();
      if (process.env.NODE_ENV === 'development') {
        console.log('%cWeb3', 'background: orange; color: white', `balanceOf ${account} is ${value}`);
      }
      return value;
    });

export const getTokenMaxCap = (): Promise<string> =>
  tokenContract.methods
    .cap()
    .call()
    .then((result: number) => {
      const value = result.toString();
      if (process.env.NODE_ENV === 'development') {
        console.log('%cWeb3', 'background: orange; color: white', `maxCap is ${value}`);
      }
      return value;
    });

export const getTokenTotalSupply = (): Promise<string> =>
  tokenContract.methods
    .totalSupply()
    .call()
    .then((result: number) => {
      const value = result.toString();
      if (process.env.NODE_ENV === 'development') {
        console.log('%cWeb3', 'background: orange; color: white', `totalSupply is ${value}`);
      }
      return value;
    });

export const getFaucetClaimEventsCount = (): Promise<number> =>
  faucetContract
    .getPastEvents('Claim', {
      fromBlock: 0 /* @todo: set block number of deployment for efficiency? */,
      toBlock: 'latest',
    })
    .then((pastEvents) => {
      console.log('%cWeb3', 'background: orange; color: white', `faucet Claim past events`, pastEvents);
      return pastEvents.length;
    });

export const getTokenTransferCount = (): Promise<number> =>
  tokenContract
    .getPastEvents('Transfer', {
      fromBlock: 0 /* @todo: set block number of deployment for efficiency? */,
      toBlock: 'latest',
    })
    .then((pastEvents) => {
      console.log('%cWeb3', 'background: orange; color: white', `token Transfer past events`, pastEvents);
      return pastEvents.length;
    });
