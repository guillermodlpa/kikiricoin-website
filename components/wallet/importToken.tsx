import { DECIMAL_COUNT } from '../../util/conversions';

declare global {
  interface Window {
    ethereum: any;
  }
}

const importKikiToken = ({
  address = process.env.NEXT_PUBLIC_KIKIRICOIN_TOKEN_ADDRESS,
  symbol = 'KIKI',
  decimals = DECIMAL_COUNT,
} = {}): Promise<any> => {
  if (!window.ethereum) {
    return Promise.reject('No window ethereum');
  }
  return window.ethereum.request({
    method: 'wallet_watchAsset',
    params: {
      type: 'ERC20',
      options: {
        address,
        symbol,
        decimals,
        image: '', // @todo
      },
    },
  });
};

export default importKikiToken;
