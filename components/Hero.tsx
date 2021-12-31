import { Flex, Container, Stack, HStack, Heading, Box, Button, Text } from '@chakra-ui/react';
import NextImage from 'next/image';

import CoinLogo from './images/1f413-coin-color-adjusted.png';
import FadeAnimation from './FadeAnimation';

const Hero = () => (
  <Box as="section" py={24} position="relative">
    <Box position="absolute" top={0} bottom={0} left={0} right={0} zIndex={-1} overflow="hidden" display="flex">
      <Box opacity={0.2} position="relative" width="100vw">
        <NextImage priority src={CoinLogo} alt="Logo" layout="fill" objectFit="cover" objectPosition={'40vw center'} />
      </Box>
    </Box>
    <Container maxW="container.md">
      <Flex
        align="center"
        justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
        direction={{ base: 'column-reverse', md: 'row' }}
        minH="60vh"
        px={8}
      >
        <Stack w={{ base: '80%', md: '55%' }} mr={6} flexShrink={0}>
          <FadeAnimation origin="left">
            <Heading as="h1" size="2xl" fontWeight="bold" mb={4}>
              KikiriCoin
            </Heading>

            <Text pb={4}>
              <i>Kikirikí</i> said the rooster, and the KIKI token was born.
            </Text>

            <Text pb={4}>
              KikiriCoin (KIKI) is an ERC-20 token deployed on the Polygon blockchain network. Its implementation is
              open source and meant to be educational and fun.
            </Text>
          </FadeAnimation>

          <FadeAnimation origin="bottom">
            <HStack>
              <Button
                borderRadius="8px"
                py="4"
                px="4"
                lineHeight="1"
                size="md"
                colorScheme="primary"
                href="#stats"
                as="a"
              >
                Learn More
              </Button>

              <Button
                borderRadius="8px"
                py="4"
                px="4"
                lineHeight="1"
                size="md"
                colorScheme="secondary"
                href="#source-code"
                as="a"
              >
                View Source Code
              </Button>
            </HStack>
          </FadeAnimation>
        </Stack>

        <Box w={{ base: '40%', md: '40%' }} mb={{ base: 12, md: 0 }}>
          <FadeAnimation origin="bottom">
            <Box rounded="100%" shadow="lg" display="flex">
              <NextImage src={CoinLogo} alt="Logo" />
            </Box>
          </FadeAnimation>
        </Box>
      </Flex>
    </Container>
  </Box>
);

export default Hero;
