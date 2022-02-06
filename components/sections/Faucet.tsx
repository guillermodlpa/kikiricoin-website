import {
  Flex,
  Container,
  Stack,
  HStack,
  Heading,
  Box,
  Button,
  Text,
  StatNumber,
  StatLabel,
  ListItem,
  OrderedList,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import NextImage from 'next/image';
import { useMetaMask } from 'metamask-react';
import { useTranslations } from 'next-intl';

import coinImage from '../images/1f413-coin-color-adjusted.png';
import { fromWei } from '../../util/conversions';
import importTokenToWallet from '../../util/importTokenToWallet';
import { claimTokensFromFaucet, getTokenBalance, getFaucetClaimEventsCount } from '../../util/web3api';
import FadeAnimation from '../ui/FadeAnimation';
import ClaimSuccessModal from './ClaimSuccessModal';
import DecoratedLink from '../ui/DecoratedLink';
import useErrorToast from '../ui/useErrorToast';
import IncreasingInteger from '../ui/IncreasingInteger';
import StyledStat from '../ui/StyledStat';

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
          showErrorToast('accountError', error);
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
        showErrorToast('faucetBalanceError', error);
      });
  }, [showErrorToast]);

  const [faucetClaimCount, setFaucetClaimCount] = useState<number>();
  useEffect(() => {
    getFaucetClaimEventsCount()
      .then((count) => {
        setFaucetClaimCount(count);
      })
      .catch((error) => {
        showErrorToast('faucetClaimCount', error);
      });
  }, [showErrorToast]);

  const handleImportToken = () => {
    importTokenToWallet().catch((error) => {
      showErrorToast('importTokenError', error);
    });
  };

  const handleConnect = () => {
    connect().catch((error) => {
      showErrorToast('connectError', error);
    });
  };

  const [claimSuccessModalIsOpen, setClaimSuccessModalIsOpen] = useState(false);
  const handleClaim = () => {
    if (!account) {
      showErrorToast('claimError', new Error('No account connected'));
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
          showErrorToast('refreshStatsError', error);
        });
        setClaimSuccessModalIsOpen(true);
      })
      .catch((error) => {
        showErrorToast('claimError', error);
      });
  };

  const t = useTranslations('Faucet');

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
              {t('title')}
            </Heading>

            <Text>{t('description.0')}</Text>

            <Text>{t('description.1')}</Text>

            <Text>{t('description.2')}</Text>

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
                isLoading={status === 'connecting'}
                spinnerPlacement="end"
                loadingText={`1. ${t('connecting')}`}
              >
                {`1. ${t('connectButton')}`}
              </Button>

              {account && status === 'connected' && (
                <Text as="i">
                  {t('alreadyConnected')}{' '}
                  <DecoratedLink href={`https://polygonscan.com/address/${account}`} color="primary" isExternal>
                    {account.substring(0, 4)}...
                    {account.substring(account.length - 4)}
                  </DecoratedLink>
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
                colorScheme="secondary"
                onClick={handleImportToken}
                disabled={status !== 'connected'}
              >
                {`2. ${t('importTokenButton')}`}
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
                onClick={handleClaim}
                disabled={status !== 'connected'}
              >
                {`3. ${t('claimButton')}`}
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
            <StyledStat>
              <StatLabel>{t('totalTimesUsed')}</StatLabel>
              <StatNumber fontSize="4xl">
                {faucetClaimCount ? <IncreasingInteger value={faucetClaimCount} /> : '-'}
              </StatNumber>
            </StyledStat>
            <StyledStat>
              <StatLabel>{t('tokensAvailable')}</StatLabel>
              <StatNumber fontSize="4xl">
                {faucetBalance !== undefined ? <IncreasingInteger value={parseInt(fromWei(faucetBalance), 10)} /> : '-'}
              </StatNumber>
            </StyledStat>
            <StyledStat>
              <StatLabel>
                {t('tokensInWallet')}{' '}
                {account && (
                  <DecoratedLink href={`https://polygonscan.com/address/${account}`} color="primary" isExternal>
                    {account.substring(0, 4)}...
                    {account.substring(account.length - 4)}
                  </DecoratedLink>
                )}
              </StatLabel>
              <StatNumber fontSize="4xl">
                {accountBalance !== undefined ? (
                  <IncreasingInteger value={parseInt(fromWei(accountBalance), 10)} />
                ) : (
                  '-'
                )}
              </StatNumber>
            </StyledStat>
          </Stack>
        </FadeAnimation>

        <Heading as="h3" size="md" mb={4}>
          {t('detailedInstructionsTitle')}
        </Heading>
        <OrderedList pl={6}>
          <ListItem fontSize="sm" mb={2}>
            {t('detailedInstructionsList.0.text')}{' '}
            <DecoratedLink href="https://metamask.io/" color="primary" isExternal>
              {t('detailedInstructionsList.0.link')}
            </DecoratedLink>
          </ListItem>

          <ListItem fontSize="sm" mb={2}>
            {t('detailedInstructionsList.1.text')}
          </ListItem>

          <ListItem fontSize="sm" mb={2}>
            {t('detailedInstructionsList.2.text')}{' '}
            <DecoratedLink
              href="https://medium.com/@nifty.pixels/getting-matic-on-the-polygon-network-with-crypto-com-48374d4d78d5"
              color="primary"
              isExternal
            >
              {t('detailedInstructionsList.2.link')}
            </DecoratedLink>
          </ListItem>

          <ListItem fontSize="sm" mb={2}>
            {t('detailedInstructionsList.3.text')}
          </ListItem>

          <ListItem fontSize="sm" mb={2}>
            {t('detailedInstructionsList.4.text')}
          </ListItem>

          <ListItem fontSize="sm" mb={2}>
            {t('detailedInstructionsList.5.text')}
          </ListItem>
        </OrderedList>
      </Container>

      <ClaimSuccessModal isOpen={claimSuccessModalIsOpen} onClose={() => setClaimSuccessModalIsOpen(false)} />
    </Box>
  );
};

export default Faucet;
