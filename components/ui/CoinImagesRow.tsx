import { Stack, Box, useBreakpointValue } from '@chakra-ui/react';
import NextImage from 'next/image';
import { useEffect, useState } from 'react';

import coinImage from '../images/1f413-coin-color-adjusted.png';
import FadeAnimation from './FadeAnimation';

const CoinImagesRow: React.FC = () => {
  const count = useBreakpointValue([2, 3, 4]);

  // We delay showing the images until the component is rendered, so the browser does it,
  // because the number of images depends on the viewport width and in SSR, it's fixed.
  const [isRendered, setIsRendered] = useState(false);
  useEffect(() => {
    setIsRendered(true);
  }, []);

  return (
    <Stack direction="row" justifyContent="center" w="100%" overflow={'hidden'} flexShrink={0} mb={12}>
      {Array(isRendered ? count : 0)
        .fill('')
        .map((_, i) => (
          <Box key={i}>
            <FadeAnimation origin="bottom">
              <NextImage width={`75px`} height={`75px`} src={coinImage} alt="KikiriCoin logo" />
            </FadeAnimation>
          </Box>
        ))}
    </Stack>
  );
};

export default CoinImagesRow;
