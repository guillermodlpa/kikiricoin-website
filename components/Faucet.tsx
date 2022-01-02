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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NextImage from 'next/image';
import { useMetaMask } from 'metamask-react';

import coinImage from './images/1f413-coin-color-adjusted.png';
import metaMaskResultScreenshot from './images/metamask-kiki-screenshot-mumbai.png';
import { fromWei } from '../util/conversions';
import importTokenToWallet from '../util/importTokenToWallet';
import { claimTokensFromFaucet, getTokenBalance, getFaucetClaimEventsCount } from '../util/web3api';
import FadeAnimation from './FadeAnimation';
import ClaimSuccessModal from './ClaimSuccessModal';
import useErrorToast from './useErrorToast';

const faucetAddress = process.env.NEXT_PUBLIC_KIKIRICOIN_FAUCET_ADDRESS || '';

const Faucet = () => {
  const showErrorToast = useErrorToast();
  const { connect, status, account } = useMetaMask();

  const [accountBalance, setAccountBalance] = useState<string>();
  useEffect(() => {
    if (account) {
      getTokenBalance(account)
        .then((balance) => setAccountBalance(balance))
        .catch((error) => {
          showErrorToast({ id: 'accountError', title: 'Error fetching connected account balance' }, error);
        });
    } else {
      setAccountBalance(undefined);
    }
  }, [account, showErrorToast]);

  const [faucetBalance, setFaucetBalance] = useState<string>();
  useEffect(() => {
    getTokenBalance(faucetAddress)
      .then((balance) => setFaucetBalance(balance))
      .catch((error) => {
        showErrorToast({ id: 'faucetBalanceError', title: 'Error fetching faucet account balance' }, error);
      });
  }, [showErrorToast]);

  const [faucetClaimCount, setFaucetClaimCount] = useState<number>();
  useEffect(() => {
    getFaucetClaimEventsCount()
      .then((count) => {
        setFaucetClaimCount(count);
      })
      .catch((error) => {
        showErrorToast({ id: 'faucetClaimCount', title: 'Error fetching faucet claim count' }, error);
      });
  }, [showErrorToast]);

  const handleImportToken = () => {
    importTokenToWallet().catch((error) => {
      showErrorToast({ id: 'importTokenError', title: `Error importing token to account` }, error);
    });
  };

  const handleConnect = () => {
    connect().catch((error) => {
      showErrorToast({ id: 'connectError', title: `Error connecting to account` }, error);
    });
  };

  const [claimSuccessModalIsOpen, setClaimSuccessModalIsOpen] = useState(false);
  const handleClaim = () => {
    if (!account) {
      showErrorToast({ id: 'claimError', title: `Error claiming` }, new Error('No account connected'));
      return;
    }
    claimTokensFromFaucet(account)
      .then(() => {
        Promise.all([
          getFaucetClaimEventsCount().then((count) => {
            setFaucetClaimCount(count);
          }),
          getTokenBalance(faucetAddress).then((balance) => setFaucetBalance(balance)),
          getTokenBalance(account).then((balance) => setAccountBalance(balance)),
        ]).catch((error) => {
          showErrorToast({ id: 'refreshStatsError', title: 'Error fetching updates' }, error);
        });
        setClaimSuccessModalIsOpen(true);
      })
      .catch((error) => {
        showErrorToast({ id: 'claimError', title: `Error claiming` }, error);
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
                onClick={handleImportToken}
                disabled={status !== 'connected'}
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
                disabled={status === 'connected'}
              >
                2. Connect Wallet
              </Button>

              {account && status === 'connected' && (
                <Text as="i">
                  Already connected to{' '}
                  <Link href={`https://polygonscan.com/address/${account}`} color="primary" isExternal>
                    {account.substring(0, 4)}...
                    {account.substring(account.length - 4)}
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
                disabled={status !== 'connected'}
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
              <StatNumber fontSize="4xl">{accountBalance !== undefined ? fromWei(accountBalance) : '-'}</StatNumber>
              <StatLabel>
                KIKI in Your Wallet{' '}
                {account && (
                  <Link href={`https://polygonscan.com/address/${account}`} color="primary" isExternal>
                    {account.substring(0, 4)}...
                    {account.substring(account.length - 4)}
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
