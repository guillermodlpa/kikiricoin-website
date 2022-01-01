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
  OrderedList,
  keyframes,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NextImage from 'next/image';
import { useMetamask } from 'use-metamask';

import coinImage from './images/1f413-coin-color-adjusted.png';
import metaMaskResultScreenshot from './images/metamask-kiki-screenshot-mumbai.png';
import { fromWei } from '../util/conversions';
import importTokenToWallet from '../util/importTokenToWallet';
import { web3, claimTokensFromFaucet, getTokenBalance, getFaucetClaimEventsCount } from '../util/web3api';
import FadeAnimation from './FadeAnimation';
import ClaimSuccessModal from './ClaimSuccessModal';

function Web3Wrapper() {
  return web3;
}

const faucetAddress = process.env.NEXT_PUBLIC_KIKIRICOIN_FAUCET_ADDRESS || '';

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
    getTokenBalance(faucetAddress).then((balance) => setFaucetBalance(balance));
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

  const [claimSuccessModalIsOpen, setClaimSuccessModalIsOpen] = useState(false);
  const handleClaim = () => {
    claimTokensFromFaucet(connectedAccount).then(() => {
      getFaucetClaimEventsCount().then((count) => {
        setFaucetClaimCount(count);
      });
      getTokenBalance(faucetAddress).then((balance) => setFaucetBalance(balance));
      getTokenBalance(connectedAccount).then((balance) => setConnectedAccountBalance(balance));
      setClaimSuccessModalIsOpen(true);
    });
  };

  // useEffect(() => {
  //   window.setClaimSuccessModalIsOpen = setClaimSuccessModalIsOpen;
  // }, []);

  return (
    <Box as="section" backgroundColor="gray.50" py={24}>
      <Container maxW="container.md" px={8}>
        <Flex
          align="center"
          justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
          direction={{ base: 'column', md: 'row' }}
          pb={16}
        >
          <Stack flexGrow={1}>
            <Stack direction="row" justifyContent="center" w="100%" flexShrink={0} mb={12}>
              {Array(4)
                .fill('')
                .map((_, i) => (
                  <Box alignSelf={i % 2 ? 'flex-end' : 'flex-start'} key={i}>
                    <FadeAnimation origin="bottom">
                      <NextImage width={`75px`} height={`75px`} src={coinImage} alt="KikiriCoin logo" />
                    </FadeAnimation>
                  </Box>
                ))}
            </Stack>

            <Heading as="h2" size="xl" fontWeight="bold" mb={4}>
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
                colorScheme="secondary"
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
                colorScheme="primary"
                onClick={handleConnect}
                disabled={metaState.isConnected}
              >
                2. Connect Wallet
              </Button>

              {metaState.isConnected && metaState.account?.[0] && (
                <Text as="i">
                  Already connected to{' '}
                  <Link href={`https://polygonscan.com/address/${metaState.account[0]}`} color="primary" isExternal>
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
                colorScheme="primary"
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
              <StatLabel>KIKI Tokens Available</StatLabel>
            </Stat>
            <Stat shadow="md" borderWidth="1px" borderRadius="md" px={6} py={10} bg="white">
              <StatNumber fontSize="4xl">
                {connectedAccountBalance !== undefined ? fromWei(connectedAccountBalance) : '-'}
              </StatNumber>
              <StatLabel>
                KIKI in Your Wallet{' '}
                {metaState.account[0] && (
                  <Link href={`https://polygonscan.com/address/${metaState.account[0]}`} color="primary" isExternal>
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
            <Link href="https://metamask.io/" color="primary" isExternal>
              MetaMask Official Site
            </Link>
          </ListItem>

          <ListItem fontSize="sm" mb={2}>
            When you set up your crypto wallet, be sure to keep your private key safe. The private key is a code that
            allows you to access your wallet from anywhere. If anybody else, like a hacker, discovers your private key,
            they&apos;d have full control to take your tokens.
          </ListItem>

          <ListItem fontSize="sm" mb={2}>
            {`Once you have MetaMask installed and configured with an account, you'll need to fund it with MATIC token. The claim operation should require less than 0.001 MATIC (~0.02€). `}
            <Link
              href="https://medium.com/@nifty.pixels/getting-matic-on-the-polygon-network-with-crypto-com-48374d4d78d5"
              color="primary"
              isExternal
            >
              Medium: Getting MATIC on the Polygon network with Crypto.com
            </Link>
          </ListItem>

          <ListItem fontSize="sm" mb={2}>
            {`Import KIKI token to it by clicking "1. Import KIKI token to MetaMask". This will display your KIKI balance in MetaMask. It should be 0 at the beginning.`}
          </ListItem>

          <ListItem fontSize="sm" mb={2}>
            {`Click "2. Connect Wallet" to enable this website to interact with MetaMask.`}
          </ListItem>

          <ListItem fontSize="sm" mb={2}>
            {`Click "3. Claim KIKI", review the transaction that MetaMask displays, and confirm it. If you have sufficient MATIC to trigger the transaction, you'll be able to sign it and shortly after you'll see a confirmation.`}
            <NextImage src={metaMaskResultScreenshot} />
          </ListItem>
        </OrderedList>
      </Container>

      <ClaimSuccessModal isOpen={claimSuccessModalIsOpen} onClose={() => setClaimSuccessModalIsOpen(false)} />
    </Box>
  );
};

export default Faucet;
