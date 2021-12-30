import { useRef } from 'react';
import { SlideFade, Box } from '@chakra-ui/react';

import { useOnScreenPersistent } from './useOnScreen';

const offsetX = {
  left: -25,
  right: 25,
  top: 0,
  bottom: 0,
};
const offsetY = {
  left: 0,
  right: 0,
  top: -25,
  bottom: 25,
};

const FadeAnimation = ({
  children,
  origin,
}: {
  children: React.ReactNode;
  origin: 'right' | 'left' | 'bottom' | 'top';
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const onScreen = useOnScreenPersistent(ref);
  return (
    <Box ref={ref} w={'100%'}>
      <SlideFade
        in={onScreen}
        offsetX={offsetX[origin] || 0}
        offsetY={offsetY[origin] || 0}
        transition={{ enter: { duration: 0.5 } }}
      >
        {children}
      </SlideFade>
    </Box>
  );
};

export default FadeAnimation;
