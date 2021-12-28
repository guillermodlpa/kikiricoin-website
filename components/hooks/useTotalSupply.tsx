import { useState, useEffect } from 'react';

import { getTokenTotalSupply } from '../../util/web3api';

const useTotalSupply = () => {
  const [totalSupply, setTotalSupply] = useState<string>('0');

  useEffect(() => {
    getTokenTotalSupply().then((value) => setTotalSupply(value));
  }, []);

  return totalSupply;
};

export default useTotalSupply;
