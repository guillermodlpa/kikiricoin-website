import { Flex, Container, Stack, HStack, Heading, Box, Button, Text } from '@chakra-ui/react';
import NextImage from 'next/image';

import CoinLogo from './images/1f413-coin-color-adjusted.png';

const Hero = () => (
  <Box as="section" py={24} position="relative">
    <Box position="absolute" top={0} bottom={0} left={0} right={0} zIndex={-1} overflow="hidden" display="flex">
      <Box opacity={0.2} position="relative" width="100vw" backgroundColor="brand.50">
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
          <Heading as="h1" size="2xl" fontWeight="bold" color="primary.800" mb={4}>
            KikiriCoin
          </Heading>

          <Text pb={4}>
            <i>Kikirikí</i> said the rooster, and the KIKI token was born.
          </Text>

          <Text pb={4}>
            The KikiriCoin is an ERC-20 token deployed on the Polygon blockchain network. Its implementation is open
            source and meant to be educational and fun.
          </Text>

          <HStack>
            <Button borderRadius="8px" py="4" px="4" lineHeight="1" size="md" colorScheme="brand" href="#stats" as="a">
              Learn More
            </Button>

            <Button
              borderRadius="8px"
              py="4"
              px="4"
              lineHeight="1"
              size="md"
              colorScheme="blackAlpha"
              href="#source-code"
              as="a"
            >
              View Source Code
            </Button>
          </HStack>
        </Stack>

        <Box w={{ base: '40%', md: '40%' }} mb={{ base: 12, md: 0 }} rounded="100%" shadow="lg" display="flex">
          <NextImage src={CoinLogo} alt="Logo" />
        </Box>
      </Flex>
    </Container>
  </Box>
);

export default Hero;
