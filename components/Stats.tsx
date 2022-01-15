import { useEffect, useState } from 'react';
import { Flex, Container, Stack, Stat, StatNumber, StatLabel, Box } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import { fromWei } from '../util/conversions';
import { getTokenMaxCap, getTokenTransferCount, getTokenTotalSupply } from '../util/web3api';
import FadeAnimation from './FadeAnimation';
import useErrorToast from './useErrorToast';
import IncreasingInteger from './IncreasingInteger';

type StatBoxProps = {
  title: string;
  data: string | JSX.Element;
};

const StatBox = ({ title, data }: StatBoxProps) => (
  <Stat shadow="md" borderWidth="1px" borderRadius="md" px={6} py={10} mx={[4, 4, 8]} mb={[8, 0]} bg="white">
    <StatNumber fontSize="4xl">{data}</StatNumber>
    <StatLabel>{title}</StatLabel>
  </Stat>
);

const Stats = () => {
  const showErrorToast = useErrorToast();

  const [totalSupply, setTotalSupply] = useState<string>();
  useEffect(() => {
    getTokenTotalSupply()
      .then((value) => setTotalSupply(value))
      .catch((error) => {
        showErrorToast('totalSupplyError', error);
      });
  }, [showErrorToast]);

  const [maxCap, setMaxCap] = useState<string>();
  useEffect(() => {
    getTokenMaxCap()
      .then((maxCap) => setMaxCap(maxCap))
      .catch((error) => {
        showErrorToast('maxCapError', error);
      });
  }, [showErrorToast]);

  const [transactionCount, setTransactionCount] = useState<number>();
  useEffect(() => {
    getTokenTransferCount()
      .then((count) => setTransactionCount(count))
      .catch((error) => {
        showErrorToast('transactionCountError', error);
      });
  }, [showErrorToast]);

  const t = useTranslations('Stats');

  return (
    <Box as="section" backgroundColor="gray.50" py={24} id="stats">
      <Container maxW="container.md">
        <Stack spacing={8}>
          <Flex
            align="center"
            direction={{ base: 'column', sm: 'row' }}
            justify={{ base: 'stretch', sm: 'space-between' }}
            alignItems={{ base: 'stretch' }}
            px={8}
          >
            <FadeAnimation origin="left">
              <StatBox
                title={t('totalSupply')}
                data={totalSupply != null ? <IncreasingInteger value={parseInt(fromWei(totalSupply), 10)} /> : '-'}
              />
            </FadeAnimation>
            <FadeAnimation origin="right">
              <StatBox title={t('deploymentDate')} data={'To do'} />
            </FadeAnimation>
          </Flex>
          <Flex
            align="center"
            direction={{ base: 'column', sm: 'row' }}
            justify={{ base: 'stretch', sm: 'space-between' }}
            alignItems={{ base: 'stretch' }}
            px={8}
          >
            <FadeAnimation origin="left">
              <StatBox
                title={t('maxCap')}
                data={maxCap != null ? <IncreasingInteger value={parseInt(fromWei(maxCap), 10)} /> : '-'}
              />
            </FadeAnimation>
            <FadeAnimation origin="right">
              <StatBox
                title={t('transferCount')}
                data={transactionCount != null ? <IncreasingInteger value={transactionCount} /> : '-'}
              />
            </FadeAnimation>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};

export default Stats;
