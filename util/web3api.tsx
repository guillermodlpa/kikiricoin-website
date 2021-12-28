import { BigNumber, ethers } from 'ethers';

import KikiriCoinABI from './ABI/KikiriCoinABI.json';
import KikiriFaucetABI from './ABI/KikiriFaucetABI.json';

export const claimTokensFromFaucet = (account: string) => {
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
    console.log('%cWeb3', 'background: orange; color: white', `claim`);
  });
};

export const getTokenBalance = (account: string): Promise<string> => {
  const networkUrl = process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK_URL;
  const tokenAdress = process.env.NEXT_PUBLIC_KIKIRICOIN_TOKEN_ADDRESS;

  if (!networkUrl) {
    return Promise.reject(new Error('No env var for network url'));
  }
  if (!tokenAdress) {
    return Promise.reject(new Error('No env var for token smart contract address'));
  }

  const provider = new ethers.providers.JsonRpcProvider(networkUrl);
  const readOnlyContract = new ethers.Contract(tokenAdress, KikiriCoinABI, provider);
  return readOnlyContract.balanceOf(account).then((result: BigNumber) => {
    const value = result.toString();
    if (process.env.NODE_ENV === 'development') {
      console.log('%cWeb3', 'background: orange; color: white', `balanceOf ${account} is ${value}`);
    }
    return value;
  });
};

export const onTokenTransfer = (account: string, callback: Function) => {
  const networkUrl = process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK_URL;
  const tokenAdress = process.env.NEXT_PUBLIC_KIKIRICOIN_TOKEN_ADDRESS;

  if (!networkUrl) {
    return Promise.reject(new Error('No env var for network url'));
  }
  if (!tokenAdress) {
    return Promise.reject(new Error('No env var for token smart contract address'));
  }

  const provider = new ethers.providers.JsonRpcProvider(networkUrl);
  const readOnlyContract = new ethers.Contract(tokenAdress, KikiriCoinABI, provider);

  const filterFrom = readOnlyContract.filters.Transfer(account);
  readOnlyContract.on(filterFrom, (from, to, value) => {
    console.log('%cWeb3', 'background: orange; color: white', `Transfer event (from)`, { from, to, value });
    callback(from, to, value);
  });
  const filterTo = readOnlyContract.filters.Transfer(null, account);
  readOnlyContract.on(filterTo, (from, to, value) => {
    console.log('%cWeb3', 'background: orange; color: white', `Transfer event (to)`, { from, to, value });
    callback(from, to, value);
  });
};

export const getTokenTotalSupply = (): Promise<string> => {
  const networkUrl = process.env.NEXT_PUBLIC_BLOCKCHAIN_NETWORK_URL;
  const tokenAdress = process.env.NEXT_PUBLIC_KIKIRICOIN_TOKEN_ADDRESS;

  if (!networkUrl) {
    return Promise.reject(new Error('No env var for network url'));
  }
  if (!tokenAdress) {
    return Promise.reject(new Error('No env var for token smart contract address'));
  }

  const provider = new ethers.providers.JsonRpcProvider(networkUrl);
  const readOnlyContract = new ethers.Contract(tokenAdress, KikiriCoinABI, provider);
  return readOnlyContract.totalSupply().then((result: BigNumber) => {
    const value = result.toString();
    if (process.env.NODE_ENV === 'development') {
      console.log('%cWeb3', 'background: orange; color: white', `totalSupply is ${value}`);
    }
    return value;
  });
};

export const getTransactionHistory = async (tokenAddress = process.env.NEXT_PUBLIC_KIKIRICOIN_TOKEN_ADDRESS) => {
  if (!tokenAddress) {
    return Promise.reject(new Error('No env var for token smart contract address'));
  }

  const provider = new ethers.providers.EtherscanProvider();
  const history = await provider.getHistory(tokenAddress);
  if (process.env.NODE_ENV === 'development') {
    console.log('%cWeb3', 'background: orange; color: white', `history`, history);
  }
  return history;
};
