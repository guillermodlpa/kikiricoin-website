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
import { useEffect, useState } from 'react';
import NextImage from 'next/image';
import { useMetamask } from 'use-metamask';

import RoosterOriginal from './images/1f413-original.png';
import { fromWei } from '../util/conversions';
import importTokenToWallet from '../util/importTokenToWallet';
import { web3, claimTokensFromFaucet, getTokenBalance, getFaucetClaimEventsCount } from '../util/web3api';

function Web3Wrapper() {
  return web3;
}

const Faucet = () => {
  const { connect, metaState } = useMetamask();
  const connectedAccount = metaState?.account[0];

  const [connectedAccountBalance, setConnectedAccountBalance] = useState<string>();
  useEffect(() => {
    if (connectedAccount) {
      getTokenBalance(connectedAccount).then((balance) => setConnectedAccountBalance(balance));
    } else {
      setConnectedAccountBalance(undefined);
    }
  }, [connectedAccount]);

  const [faucetBalance, setFaucetBalance] = useState<string>();
  useEffect(() => {
    const faucetAddress = process.env.NEXT_PUBLIC_KIKIRICOIN_FAUCET_ADDRESS;
    if (faucetAddress) {
      getTokenBalance(faucetAddress).then((balance) => setFaucetBalance(balance));
    }
  }, []);

  const [faucetClaimCount, setFaucetClaimCount] = useState<number>();
  useEffect(() => {
    getFaucetClaimEventsCount().then((count) => {
      setFaucetClaimCount(count);
    });
  }, []);

  const handleConnect = () => {
    connect(Web3Wrapper).catch((error) => console.error(error));
  };

  const handleClaim = () => {
    claimTokensFromFaucet(connectedAccount).then(() => {
      getFaucetClaimEventsCount().then((count) => {
        setFaucetClaimCount(count);
      });
      // @todo: refresh faucet balance and connected account balance
    });
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
            <NextImage src={RoosterOriginal} alt="Logo" />
          </Stack>

          <Stack w={{ base: '80%', md: '70%' }} ml={[0, 0, 8]}>
            <Heading as="h2" size="xl" fontWeight="bold" color="primary.800" mb={4}>
              Faucet
            </Heading>

            <Text>
              A faucet is a dispenser of token. You&apos;ll need to connect your wallet and initiate a transaction to
              claim the KIKI tokens by clicking the Claim button below.
            </Text>

            <Text>
              The transaction in the Polygon network will require a small amount of MATIC token, like any other
              transaction executed on the Polygon blockchain.
            </Text>

            <HStack pt={4}>
              <Button
                borderRadius="8px"
                py="4"
                px="4"
                lineHeight="1"
                size="md"
                variant={'solid'}
                colorScheme="blackAlpha"
                onClick={() => {
                  importTokenToWallet().catch((error: Error) => console.error(error));
                }}
                disabled={!metaState.isAvailable}
              >
                1. Import KIKI token to MetaMask
              </Button>
            </HStack>

            <HStack pt={4}>
              <Button
                borderRadius="8px"
                py="4"
                px="4"
                lineHeight="1"
                size="md"
                variant={'solid'}
                colorScheme="brand"
                onClick={handleConnect}
                disabled={metaState.isConnected}
              >
                2. Connect Wallet
              </Button>

              {metaState.isConnected && metaState.account?.[0] && (
                <Text as="i">
                  Already connected to{' '}
                  <Link href={`https://polygonscan.com/address/${metaState.account[0]}`} color="brand" isExternal>
                    {metaState.account[0].substring(0, 4)}...
                    {metaState.account[0].substring(metaState.account[0].length - 4)}
                  </Link>
                </Text>
              )}
            </HStack>

            <HStack pt={4}>
              <Button
                borderRadius="8px"
                py="4"
                px="4"
                lineHeight="1"
                size="md"
                variant={'solid'}
                colorScheme="brand"
                onClick={handleClaim}
                disabled={!metaState.isConnected}
              >
                3. Claim KIKI
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
          <Stat shadow="md" borderWidth="1px" borderRadius="md" px={6} py={10} bg="white">
            <StatNumber fontSize="4xl">{faucetClaimCount || '-'}</StatNumber>
            <StatLabel>Total Times Used</StatLabel>
          </Stat>
          <Stat shadow="md" borderWidth="1px" borderRadius="md" px={6} py={10} bg="white">
            <StatNumber fontSize="4xl">{faucetBalance !== undefined ? fromWei(faucetBalance) : '-'}</StatNumber>
            <StatLabel>Unclaimed KIKI Tokens</StatLabel>
          </Stat>
          <Stat shadow="md" borderWidth="1px" borderRadius="md" px={6} py={10} bg="white">
            <StatNumber fontSize="4xl">
              {connectedAccountBalance !== undefined ? fromWei(connectedAccountBalance) : '-'}
            </StatNumber>
            <StatLabel>
              KIKI in Your Wallet{' '}
              {metaState.account[0] && (
                <Link href={`https://polygonscan.com/address/${metaState.account[0]}`} color="brand" isExternal>
                  {metaState.account[0].substring(0, 4)}...
                  {metaState.account[0].substring(metaState.account[0].length - 4)}
                </Link>
              )}
            </StatLabel>
          </Stat>
        </Stack>

        <Heading as="h3" size="md" mb={4}>
          Detailed Instructions
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
