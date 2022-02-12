import {
  SimpleGrid,
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
  useBreakpointValue,
  Alert,
  AlertIcon,
  AlertDescription,
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
import { CheckIcon } from '@chakra-ui/icons';

const faucetAddress = process.env.NEXT_PUBLIC_KIKIRICOIN_FAUCET_ADDRESS || '';

const FaucetCoinHeaderImages = () => {
  const count = useBreakpointValue([2, 3, 4]);
  return (
    <Stack direction="row" justifyContent="center" w="100%" overflow={'hidden'} flexShrink={0} mb={12}>
      {Array(count)
        .fill('')
        .map((_, i) => (
          <Box key={i}>
            <FadeAnimation origin="bottom">
              <NextImage width={`75px`} height={`75px`} src={coinImage} alt="KikiriCoin logo" />
            </FadeAnimation>
          </Box>
        ))}
    </Stack>
  );
};

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
  const [isClaiming, setIsClaiming] = useState(false);
  const handleClaim = () => {
    if (!account) {
      showErrorToast('claimError', new Error('No account connected'));
      return;
    }
    setIsClaiming(true);
    claimTokensFromFaucet(account)
      .then(() => {
        setClaimSuccessModalIsOpen(true);
      })
      .catch((error) => {
        showErrorToast('claimError', error);
      })
      .then(() => {
        setIsClaiming(false);
      });
  };

  const handleCloseClaimSuccessModalAndReloadCounts = () => {
    setClaimSuccessModalIsOpen(false);
    if (account) {
      Promise.all([
        getFaucetClaimEventsCount().then((count) => {
          setFaucetClaimCount(count);
        }),
        getTokenBalance(faucetAddress).then((balance) => setFaucetBalance(balance)),
        getTokenBalance(account).then((balance) => setAccountBalance(balance)),
      ]).catch((error) => {
        showErrorToast('refreshStatsError', error);
      });
    }
  };

  const t = useTranslations('Faucet');

  const faucetIsEmpty = faucetBalance !== undefined && parseInt(faucetBalance, 10) === 0;

  // useEffect(() => {
  //   window.setClaimSuccessModalIsOpen = setClaimSuccessModalIsOpen;
  // }, []);

  return (
    <Box as="section" backgroundColor="gray.50" py={24}>
      <Container maxW="container.sm" px={8}>
        <Flex
          align="center"
          justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
          direction={{ base: 'column', md: 'row' }}
          pb={16}
        >
          <Stack flexGrow={1}>
            <FaucetCoinHeaderImages />

            <Heading as="h2" size="xl" fontWeight="bold" mb={4}>
              {t('title')}
            </Heading>

            <Text>{t('description.0')}</Text>

            <Text>{t('description.1')}</Text>

            <Text>{t('description.2')}</Text>

            <Text>{t('description.3')}</Text>

            {status === 'unavailable' && (
              <Alert status="warning">
                <AlertIcon />
                <AlertDescription>
                  {t('metamaskMissing.errorMessage')}{' '}
                  <DecoratedLink isExternal href="https://metamask.io/">
                    {t('metamaskMissing.installLink')}
                  </DecoratedLink>
                </AlertDescription>
              </Alert>
            )}

            <Stack direction="column" spacing={4} align="flex-start" pt={4}>
              <HStack>
                <Button
                  variant="solid"
                  size="md"
                  colorScheme="primary"
                  onClick={status !== 'connecting' ? handleConnect : () => {}}
                  disabled={status !== 'notConnected' && status !== 'connecting'}
                  isLoading={status === 'connecting'}
                  spinnerPlacement="end"
                  loadingText={t('connecting')}
                  rightIcon={status === 'connected' ? <CheckIcon /> : undefined}
                  whiteSpace="normal"
                  textAlign="left"
                  flexShrink={0}
                >
                  {t('connectButton')}
                </Button>

                {account && status === 'connected' && (
                  <Text>
                    {t('alreadyConnected')}{' '}
                    <DecoratedLink href={`https://polygonscan.com/address/${account}`} color="primary" isExternal>
                      {account.substring(0, 4)}...
                      {account.substring(account.length - 4)}
                    </DecoratedLink>
                  </Text>
                )}
              </HStack>

              <Button
                variant="solid"
                size="md"
                colorScheme="secondary"
                onClick={handleImportToken}
                disabled={status !== 'connected'}
                whiteSpace="normal"
                textAlign="left"
              >
                {t('importTokenButton')}
              </Button>

              <HStack>
                <Button
                  variant="solid"
                  size="md"
                  colorScheme="primary"
                  onClick={handleClaim}
                  disabled={status !== 'connected' || faucetIsEmpty}
                  isLoading={isClaiming}
                  loadingText={t('claimButton')}
                  spinnerPlacement="end"
                  whiteSpace="normal"
                  textAlign="left"
                  flexShrink={0}
                >
                  {t('claimButton')}
                </Button>
                {faucetIsEmpty && <Text color="red">{t('emptyFaucetMessage')}</Text>}
              </HStack>

              <Text>
                {t('issues.questionText')}{' '}
                <DecoratedLink isExternal href="https://github.com/guillermodlpa/kikiricoin-website/issues">
                  {t('issues.reportIssueLink')}
                </DecoratedLink>
              </Text>
            </Stack>
          </Stack>
        </Flex>

        <FadeAnimation origin="bottom">
          <SimpleGrid columns={[1, 2, 3]} spacing={8} mb={16}>
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
          </SimpleGrid>
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
            {t('detailedInstructionsList.2.text')}
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

      <ClaimSuccessModal isOpen={claimSuccessModalIsOpen} onClose={handleCloseClaimSuccessModalAndReloadCounts} />
    </Box>
  );
};

export default Faucet;
