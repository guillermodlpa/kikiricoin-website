import { useState, useEffect, memo } from 'react';
import {
  Heading,
  Modal,
  ModalOverlay,
  ModalContent,
  Container,
  ModalBody,
  Box,
  Text,
  ModalCloseButton,
  useTheme,
  keyframes,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import debounce from 'lodash.debounce';

import CoinLogo from './images/1f413-coin-color-adjusted.png';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return { width, height };
};

const COIN_SIZE = 80;
const VERTICAL_SEPARATION = 3 * COIN_SIZE;

const spin = keyframes`
  from {transform: rotateY(0deg) translate(0, -${COIN_SIZE}px);}
  to {transform: rotateY(360deg) translate(0, ${VERTICAL_SEPARATION - COIN_SIZE}px);}
`;

const DroppingCoin = ({ top, left }: { top: number; left: number }) => (
  <Box
    position="fixed"
    top={top}
    left={left}
    width={`${COIN_SIZE}px`}
    height={`${COIN_SIZE}px`}
    zIndex={useTheme().zIndices.modal}
    animation={`${spin} infinite 2s linear`}
    opacity={0.8}
  >
    <NextImage src={CoinLogo} alt="KikiriCoin logo animated" />
  </Box>
);

const DroppingCoinsOverlay = memo(function DroppingCoinsOverlayRoot() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    const handleResize = () => {
      setWindowDimensions(getWindowDimensions());
    };
    const debouncedResize = debounce(handleResize, 500);
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  const horizontalSeparation = windowDimensions.width > 800 ? 400 : 200;

  const horizontalDivisions = Math.floor(windowDimensions.width / horizontalSeparation);
  const verticalDivisions = Math.floor(windowDimensions.height / VERTICAL_SEPARATION);
  const leftStartPoint = windowDimensions.width / horizontalDivisions / 2;

  const coinsArray = Array(horizontalDivisions)
    .fill('')
    .map(() => Array(verticalDivisions + 1).fill(''));

  return (
    <>
      {coinsArray.map((verticalArray, horizontalIndex) =>
        verticalArray.map((_, verticalIndex) => (
          <DroppingCoin
            key={`${horizontalIndex}-${verticalIndex}`}
            top={0 + verticalIndex * VERTICAL_SEPARATION}
            left={leftStartPoint + horizontalIndex * horizontalSeparation}
          />
        ))
      )}
    </>
  );
});

const ClaimSuccessModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => (
  <Modal isOpen={isOpen} onClose={onClose} isCentered>
    <ModalOverlay />

    <DroppingCoinsOverlay />

    <ModalContent backgroundColor="secondary.500" shadow="none">
      <ModalCloseButton size="lg" />
      <ModalBody px={8} py={12}>
        <Container w="65%" mb={12}>
          <Box rounded="100%" shadow="lg" display="flex">
            <NextImage src={CoinLogo} alt="KikiriCoin Logo" />
          </Box>
        </Container>
        <Heading as="h2" size="3xl" textAlign="center" mb={4}>
          Claimed!
        </Heading>
        <Text textAlign="center" fontSize="lg" mb={4}>
          10 KIKI have been added to your account.
        </Text>
        <Text textAlign="center" fontSize="lg">
          Thank you!
        </Text>
      </ModalBody>
    </ModalContent>
  </Modal>
);

export default ClaimSuccessModal;
