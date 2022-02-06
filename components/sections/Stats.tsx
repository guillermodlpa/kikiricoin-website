import { useEffect, useState } from 'react';
import { SimpleGrid, Container, Stack, StatNumber, StatLabel, Box } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import { fromWei } from '../../util/conversions';
import { getTokenMaxCap, getTokenTransferCount, getTokenTotalSupply } from '../../util/web3api';
import FadeAnimation from '../ui/FadeAnimation';
import useErrorToast from '../ui/useErrorToast';
import IncreasingInteger from '../ui/IncreasingInteger';
import StyledStat from '../ui/StyledStat';

type StatBoxProps = {
  title: string;
  data: string | JSX.Element;
};

const StatBox = ({ title, data }: StatBoxProps) => (
  <StyledStat>
    <StatLabel>{title}</StatLabel>
    <StatNumber fontSize="4xl">{data}</StatNumber>
  </StyledStat>
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
      <Container maxW="container.sm" px={8}>
        <Stack spacing={8}>
          <SimpleGrid columns={[1, 2]} spacing={8}>
            <FadeAnimation origin="left">
              <StatBox
                title={t('totalSupply')}
                data={totalSupply != null ? <IncreasingInteger value={parseInt(fromWei(totalSupply), 10)} /> : '-'}
              />
            </FadeAnimation>
            <FadeAnimation origin="right">
              <StatBox title={t('deploymentDate')} data={'To do'} />
            </FadeAnimation>
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
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
};

export default Stats;
