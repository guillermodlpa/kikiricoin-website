import { AlchemyWeb3, createAlchemyWeb3 } from '@alch/alchemy-web3';
import { Contract } from 'web3-eth-contract';
import { AbiItem } from 'web3-utils/types';

import KikiriCoinABI from './ABI/KikiriCoinABI.json';
import KikiriFaucetABI from './ABI/KikiriFaucetABI.json';

function singleton<T>(factory: () => T) {
  let instance: T;
  return () => {
    if (!instance) {
      instance = factory();
    }
    return instance;
  };
}

const getWeb3 = singleton<AlchemyWeb3>(() => {
  if (!process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK_URL) {
    throw new Error('No process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK_URL');
  }
  return createAlchemyWeb3(process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK_URL);
});

const getTokenContract = singleton<Contract>(() => {
  if (!process.env.NEXT_PUBLIC_KIKIRICOIN_TOKEN_ADDRESS) {
    throw new Error('No process.env.NEXT_PUBLIC_KIKIRICOIN_TOKEN_ADDRESS');
  }
  const web3 = getWeb3();
  return new web3.eth.Contract(KikiriCoinABI as AbiItem[], process.env.NEXT_PUBLIC_KIKIRICOIN_TOKEN_ADDRESS);
});

const getFaucetContract = singleton<Contract>(() => {
  if (!process.env.NEXT_PUBLIC_KIKIRICOIN_FAUCET_ADDRESS) {
    throw new Error('No process.env.NEXT_PUBLIC_KIKIRICOIN_FAUCET_ADDRESS');
  }
  const web3 = getWeb3();
  return new web3.eth.Contract(KikiriFaucetABI as AbiItem[], process.env.NEXT_PUBLIC_KIKIRICOIN_FAUCET_ADDRESS);
});

// see https://web3js.readthedocs.io/en/v1.2.11/web3-eth-contract.html#methods-mymethod-send
type SendCallbacks = {
  sending?: (payload: Object) => void;
  sent?: (payload: Object) => void;
  transactionHash?: (hash: string) => void;
  receipt?: (receipt: Object) => void;
  confirmation?: (confirmation: number, receipt: Object, latestBlockHash: string) => void;
  error?: (error: Error, receipt: Object | undefined) => void;
};

export const claimTokensFromFaucet = async (address: string, callbacks: SendCallbacks) => {
  if (!address) {
    return Promise.reject(new Error('No address'));
  }
  getFaucetContract()
    .methods.claim()
    .send({ from: address })
    .on('sending', callbacks.sending || (() => {}))
    .on('sent', (payload: Object) => {
      console.log('%cWeb3', 'background: orange; color: white', `claim.sent`);
      (callbacks.sent || (() => {}))(payload);
    })
    .on('transactionHash', (hash: string) => {
      console.log('%cWeb3', 'background: orange; color: white', `claim.transactionHash`);
      (callbacks.transactionHash || (() => {}))(hash);
    })
    .on('receipt', (receipt: Object) => {
      console.log('%cWeb3', 'background: orange; color: white', `claim.receipt`);
      (callbacks.receipt || (() => {}))(receipt);
    })
    .on('confirmation', (confirmation: number, receipt: Object, latestBlockHash: string) => {
      console.log('%cWeb3', 'background: orange; color: white', `claim.confirmation`);
      (callbacks.confirmation || (() => {}))(confirmation, receipt, latestBlockHash);
    })
    .on('error', (error: Error, receipt: Object | undefined) => {
      console.log('%cWeb3', 'background: orange; color: white', `claim.error`);
      (callbacks.error || (() => {}))(error, receipt);
    });
};

export const getTokenBalance = async (account: string): Promise<string> =>
  getTokenContract()
    .methods.balanceOf(account)
    .call()
    .then((result: number) => {
      const value = result.toString();
      if (process.env.NODE_ENV === 'development') {
        console.log('%cWeb3', 'background: orange; color: white', `balanceOf ${account} is ${value}`);
      }
      return value;
    });

export const getTokenMaxCap = async (): Promise<string> =>
  getTokenContract()
    .methods.cap()
    .call()
    .then((result: number) => {
      const value = result.toString();
      if (process.env.NODE_ENV === 'development') {
        console.log('%cWeb3', 'background: orange; color: white', `maxCap is ${value}`);
      }
      return value;
    });

export const getTokenTotalSupply = async (): Promise<string> =>
  getTokenContract()
    .methods.totalSupply()
    .call()
    .then((result: number) => {
      const value = result.toString();
      if (process.env.NODE_ENV === 'development') {
        console.log('%cWeb3', 'background: orange; color: white', `totalSupply is ${value}`);
      }
      return value;
    });

export const getFaucetClaimEventsCount = async (): Promise<number> =>
  getFaucetContract()
    .getPastEvents('Claim', {
      fromBlock: 0 /* @todo: set block number of deployment for efficiency? */,
      toBlock: 'latest',
    })
    .then((pastEvents) => {
      console.log('%cWeb3', 'background: orange; color: white', `faucet Claim past events`, pastEvents);
      return pastEvents.length;
    });

export const getTokenTransferCount = async (): Promise<number> =>
  getTokenContract()
    .getPastEvents('Transfer', {
      fromBlock: 0 /* @todo: set block number of deployment for efficiency? */,
      toBlock: 'latest',
    })
    .then((pastEvents) => {
      console.log('%cWeb3', 'background: orange; color: white', `token Transfer past events`, pastEvents);
      return pastEvents.length;
    });
