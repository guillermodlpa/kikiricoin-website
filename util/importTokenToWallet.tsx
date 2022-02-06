import { DECIMAL_COUNT } from './conversions';
import walletTokenLogoBase64 from './wallet-token-logo-base64';

declare global {
  interface Window {
    ethereum: any;
  }
}

const importTokenToWallet = ({
  address = process.env.NEXT_PUBLIC_KIKIRICOIN_TOKEN_ADDRESS,
  symbol = 'KIKI',
  decimals = DECIMAL_COUNT,
} = {}): Promise<any> => {
  if (!window.ethereum) {
    return Promise.reject(new Error('No wallet detected'));
  }
  return window.ethereum
    .request({
      method: 'wallet_watchAsset',
      params: {
        type: 'ERC20',
        options: {
          address,
          symbol,
          decimals,
          image: walletTokenLogoBase64,
        },
      },
    })
    .catch((error: Error) => {
      if (error.message === 'HTTP Status code: 400') {
        throw new Error(`Adding custom tokens programmatically isn't supported by this wallet`);
      }
      throw error;
    });
};

export default importTokenToWallet;
