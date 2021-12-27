import {
  Flex,
  Container,
  Stack,
  HStack,
  Heading,
  Box,
  Button,
  Text,
  Stat,
  StatNumber,
  StatLabel,
  Link,
} from '@chakra-ui/react';
import NextImage from 'next/image';

import RoosterOriginal from './images/1f413-original.png';

const Faucet = () => (
  <Box as="section" bg="gray.100" py={24}>
    <Container maxW="container.md">
      <Flex
        align="center"
        justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
        direction={{ base: 'column', md: 'row' }}
        minH="60vh"
        px={8}
      >
        <Box w={{ base: '40%', md: '30%' }} mb={{ base: 12, md: 0 }} opacity={0.5} cursor="not-allowed">
          <NextImage src={RoosterOriginal} alt="Logo" />
        </Box>

        <Stack w={{ base: '80%', md: '70%' }} ml={[0, 0, 8]}>
          <Heading as="h2" size="xl" fontWeight="bold" color="primary.800" mb={4}>
            Faucet
          </Heading>

          <Text>
            Free dispenser of token here. Connect your wallet, and click on the rooster for it to give you 1 KIKI. Note
            you can&apos;t dispense more than 10 times per day.
          </Text>

          <Text>
            <Link href="https://polygonscan.com/" color="brand" isExternal>
              View faucet smart contract on PolygonScan
            </Link>
          </Text>

          <HStack pt={8} spacing={8}>
            <Stat shadow="md" borderWidth="1px" borderRadius="md" px={6} py={10} mb={[8, 0]} bg="white">
              <StatNumber fontSize="4xl">100</StatNumber>
              <StatLabel>KIKI in pool</StatLabel>
            </Stat>
            <Stat shadow="md" borderWidth="1px" borderRadius="md" px={6} py={10} mb={[8, 0]} bg="white">
              <StatNumber fontSize="4xl">100</StatNumber>
              <StatLabel>Times used</StatLabel>
            </Stat>
          </HStack>

          <HStack pt={8}>
            <Button borderRadius="8px" py="4" px="4" lineHeight="1" size="md" variant={'solid'} colorScheme="brand">
              Connect Wallet
            </Button>
          </HStack>
        </Stack>
      </Flex>
    </Container>
  </Box>
);

export default Faucet;
