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
  OrderedList,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NextImage from 'next/image';
import { useMetamask } from 'use-metamask';

import coinImage from './images/1f413-coin-color-adjusted.png';
import { fromWei } from '../util/conversions';
import importTokenToWallet from '../util/importTokenToWallet';
import { web3, claimTokensFromFaucet, getTokenBalance, getFaucetClaimEventsCount } from '../util/web3api';
import FadeAnimation from './FadeAnimation';

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
            <Flex direction="column" justifyItems="stretch">
              {Array(4)
                .fill('')
                .map((_, i) => (
                  <Box alignSelf={i % 2 ? 'flex-end' : 'flex-start'} key={i}>
                    <FadeAnimation origin={i % 2 ? 'left' : 'right'}>
                      <NextImage width="75px" height="75px" src={coinImage} alt="KikiriCoin logo" />
                    </FadeAnimation>
                  </Box>
                ))}
            </Flex>
          </Stack>

          <Stack w={{ base: '80%', md: '70%' }} ml={[0, 0, 8]}>
            <Heading as="h2" size="xl" fontWeight="bold" color="primary.800" mb={4}>
              Faucet
            </Heading>

            <Text>A faucet is a dispenser of token. It&apos;s a common approach to distribute new tokens.</Text>

            <Text>
              In order to use it, you&apos;ll need to connect your wallet and initiate a transaction to claim the
              tokens. This will happen automatically when you press the Claim button below.
            </Text>

            <Text>
              Like any other transaction in the Polygon network, it will require a small amount of MATIC token. When you
              press Claim, MetaMask will display the estimated transaction cost and ask for confirmation.
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

        <FadeAnimation origin="bottom">
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
        </FadeAnimation>

        <Heading as="h3" size="md" mb={4}>
          Detailed Instructions
        </Heading>
        <OrderedList pl={6}>
          <ListItem fontSize="sm" mb={2}>
            If you do not have a crypto wallet, download and install MetaMask.{' '}
            <Link href="https://metamask.io/" color="brand" isExternal>
              MetaMask Official Site
            </Link>
          </ListItem>

          <ListItem fontSize="sm" mb={2}>
            When you set up your crypto wallet, be sure to keep your private key safe. The private key is a code that
            allows you to access your wallet from anywhere. If anybody else, like a hacker, discovers your private key,
            they&apos;d have full control to take your tokens.
          </ListItem>

          <ListItem fontSize="sm" mb={2}>
            {`Once you have MetaMask installed and configured with an account, you'll need to fund it with MATIC token. @TODO`}
          </ListItem>

          <ListItem fontSize="sm" mb={2}>
            {`Import KIKI token to it by clicking "1. Import KIKI token to MetaMask". This will display your KIKI balance in MetaMask. It should be 0 at the beginning.`}
          </ListItem>

          <ListItem fontSize="sm" mb={2}>
            {`Click "2. Connect Wallet" to enable this website to interact with MetaMask.`}
          </ListItem>

          <ListItem fontSize="sm" mb={2}>
            {`Click "3. Claim KIKI", review the transaction that MetaMask displays, and confirm it.`}
          </ListItem>
        </OrderedList>
        <UnorderedList pl={6}>
          <ListItem fontSize="sm" mb={2}>
            How can I trust your smart contracts? You can inspect their verified source code in Polygonscan. @TODO
          </ListItem>
        </UnorderedList>
      </Container>
    </Box>
  );
};

export default Faucet;
