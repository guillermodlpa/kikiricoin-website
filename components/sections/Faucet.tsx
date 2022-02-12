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
  Alert,
  AlertIcon,
  AlertDescription,
} from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { useMetaMask } from 'metamask-react';
import { useTranslations } from 'next-intl';

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
import CoinImagesRow from '../ui/CoinImagesRow';

const faucetAddress = process.env.NEXT_PUBLIC_KIKIRICOIN_FAUCET_ADDRESS || '';
const expectedChainId = process.env.NEXT_PUBLIC_CHAIN_ID || '';

const Faucet = () => {
  const showErrorToast = useErrorToast();
  const { connect, status, account, chainId } = useMetaMask();

  const [accountBalance, setAccountBalance] = useState<string>();
  const [faucetBalance, setFaucetBalance] = useState<string>();
  const [faucetClaimCount, setFaucetClaimCount] = useState<number>();

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

  const refreshFaucetStats = useCallback(() => {
    Promise.all([
      getFaucetClaimEventsCount().then((count) => {
        setFaucetClaimCount(count);
      }),
      getTokenBalance(faucetAddress).then((balance) => setFaucetBalance(balance)),
      account
        ? getTokenBalance(account).then((balance) => setAccountBalance(balance))
        : Promise.resolve().then(() => setAccountBalance(undefined)),
    ]).catch((error) => {
      showErrorToast('refreshStatsError', error);
    });
  }, [showErrorToast, account]);

  useEffect(() => {
    refreshFaucetStats();
  }, [refreshFaucetStats]);

  const [claimSuccessModalIsOpen, setClaimSuccessModalIsOpen] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const handleClaim = () => {
    if (!account) {
      showErrorToast('claimError', new Error('No account connected'));
      return;
    }

    claimTokensFromFaucet(account, {
      sending: () => {
        setIsClaiming(true);
      },
      transactionHash: () => {
        setIsClaiming(false);
        setClaimSuccessModalIsOpen(true);
      },
      error: (error) => {
        setIsClaiming(false);
        showErrorToast('claimError', error);
      },
      receipt: () => {
        refreshFaucetStats();
      },
    });
  };

  const handleCloseClaimSuccessModalAndReloadCounts = () => {
    setClaimSuccessModalIsOpen(false);
    refreshFaucetStats();
  };

  const faucetIsEmpty = faucetBalance !== undefined && parseInt(faucetBalance, 10) === 0;
  const chainIdBase10 = chainId ? `${parseInt(chainId, 16)}` : null;
  const isExpectedChain = chainIdBase10 && chainIdBase10 === expectedChainId;

  // useEffect(() => {
  //   window.setClaimSuccessModalIsOpen = setClaimSuccessModalIsOpen;
  // }, []);

  const t = useTranslations('Faucet');

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
            <CoinImagesRow />

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

            {status === 'connected' && !isExpectedChain && (
              <Alert status="error">
                <AlertIcon />
                <AlertDescription>
                  <Text>{t('wrongChain.errorMessage')}</Text>
                  <Text>
                    {t('wrongChain.expected')}
                    {`: `}
                    <DecoratedLink isExternal href={`https://chainlist.org/?search=${expectedChainId}`}>
                      {expectedChainId}
                    </DecoratedLink>
                  </Text>
                  <Text>
                    {t('wrongChain.actual')}
                    {`: `}
                    <DecoratedLink isExternal href={`https://chainlist.org/?search=${chainIdBase10}`}>
                      {chainIdBase10}
                    </DecoratedLink>
                  </Text>
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
                disabled={status !== 'connected' || !isExpectedChain}
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
                  onClick={!isClaiming ? handleClaim : () => {}}
                  disabled={status !== 'connected' || faucetIsEmpty || !isExpectedChain}
                  isLoading={isClaiming}
                  loadingText={t('claiming')}
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
