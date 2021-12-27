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
  ListItem,
  UnorderedList,
} from '@chakra-ui/react';
import NextImage from 'next/image';
import { useMetamask } from 'use-metamask';

import RoosterOriginal from './images/1f413-original.png';
import useFaucetBalance from './hooks/useFaucetBalance';
import useConnectedAccount from './hooks/useConnectedAccount';
import { fromWei } from '../util/conversions';
import { ethers } from 'ethers';

const Faucet = () => {
  const { connect, metaState } = useMetamask();
  const faucetBalance = useFaucetBalance();
  const [connectedAccountBalance, claim] = useConnectedAccount(metaState?.account[0]);

  const handleConnect = () => {
    connect(ethers.providers.Web3Provider).catch((error) => console.error(error));
  };

  const handleClaim = () => {
    claim();
  };

  return (
    <Box as="section" bg="gray.100" py={24}>
      <Container maxW="container.md" px={8}>
        <Flex
          align="center"
          justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
          direction={{ base: 'column', md: 'row' }}
          pb={16}
        >
          <Stack w={{ base: '40%', md: '30%' }} mb={{ base: 12, md: 0 }}>
            <Box
              opacity={metaState.isConnected ? 1 : 0.5}
              cursor={metaState.isConnected ? 'pointer' : 'not-allowed'}
              onClick={metaState.isConnected ? handleClaim : undefined}
            >
              <NextImage src={RoosterOriginal} alt="Logo" />
            </Box>
          </Stack>

          <Stack w={{ base: '80%', md: '70%' }} ml={[0, 0, 8]}>
            <Heading as="h2" size="xl" fontWeight="bold" color="primary.800" mb={4}>
              Faucet
            </Heading>

            <Text>
              Free dispenser of token here. Connect your wallet, and click on the rooster for it to give you 1 KIKI.
              Note you can&apos;t dispense more than 10 times per day.
            </Text>

            {metaState.account[0] && (
              <Text>
                Connected&nbsp;
                <Link href={`https://polygonscan.com/address/${metaState.account[0]}`} color="brand" isExternal>
                  {metaState.account[0].substring(0, 6)}...
                </Link>
              </Text>
            )}

            <HStack pt={8}>
              {!metaState.isConnected && (
                <Button
                  borderRadius="8px"
                  py="4"
                  px="4"
                  lineHeight="1"
                  size="md"
                  variant={'solid'}
                  colorScheme="brand"
                  onClick={handleConnect}
                >
                  Connect Wallet
                </Button>
              )}
              <Button
                borderRadius="8px"
                py="4"
                px="4"
                lineHeight="1"
                size="md"
                variant={'solid'}
                colorScheme="blackAlpha"
              >
                Import KIKI token to MetaMask
              </Button>
            </HStack>
          </Stack>
        </Flex>

        <Stack
          align="center"
          justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
          direction={{ base: 'column', md: 'row' }}
          alignItems={{ base: 'stretch' }}
          spacing={8}
          mb={16}
        >
          <Stat shadow="md" borderWidth="1px" borderRadius="md" px={6} py={10} mb={[8, 0]} bg="white">
            <StatNumber fontSize="4xl">{faucetBalance !== undefined ? fromWei(faucetBalance) : '-'}</StatNumber>
            <StatLabel>KIKI in pool</StatLabel>
          </Stat>
          <Stat shadow="md" borderWidth="1px" borderRadius="md" px={6} py={10} mb={[8, 0]} bg="white">
            <StatNumber fontSize="4xl">
              {connectedAccountBalance !== undefined ? fromWei(connectedAccountBalance) : '-'}
            </StatNumber>
            <StatLabel>KIKI in your wallet</StatLabel>
          </Stat>
        </Stack>

        <Heading as="h3" size="md" mb={4}>
          Instructions
        </Heading>
        <UnorderedList pl={6}>
          <ListItem fontSize="sm" mb={2}>
            If you do not have a crypto wallet, download and install MetaMask.
          </ListItem>

          <ListItem fontSize="sm" mb={2}>
            When you set up your crypto wallet, be sure to keep your private key safe. The private key is a code that
            allows you to access your wallet from anywhere. If anybody else, like a hacker, discovers your private key,
            they&apos;d have full control to take your tokens.
          </ListItem>

          <ListItem fontSize="sm" mb={2}>
            Once you have MetaMask installed and configured with an account, import KIKI token to it.
          </ListItem>

          <ListItem fontSize="sm" mb={2}>
            Then click Connect to enable this website to send requests to MetaMask.
          </ListItem>

          <ListItem fontSize="sm" mb={2}>
            TODO
          </ListItem>

          <ListItem fontSize="sm" mb={2}>
            How can I trust your smart contracts? You can inspect their verified source code in Polygonscan.
          </ListItem>
        </UnorderedList>
      </Container>
    </Box>
  );
};

export default Faucet;
