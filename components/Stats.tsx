import { Flex, Container, Stack, Stat, StatNumber, StatLabel, Box } from '@chakra-ui/react';

import { fromWei } from '../util/conversions';
import { useEffect, useState } from 'react';
import { getTokenMaxCap, getTokenTransferCount, getTokenTotalSupply } from '../util/web3api';
import FadeAnimation from './FadeAnimation';
import useErrorToast from './useErrorToast';

type StatBoxProps = {
  title: string;
  data: string;
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
        showErrorToast({ id: 'totalSupplyError', title: `Error fetching total supply` }, error);
      });
  }, [showErrorToast]);

  const [maxCap, setMaxCap] = useState<string>();
  useEffect(() => {
    getTokenMaxCap()
      .then((maxCap) => setMaxCap(maxCap))
      .catch((error) => {
        showErrorToast({ id: 'maxCapError', title: `Error fetching max cap` }, error);
      });
  }, [showErrorToast]);

  const [transactionCount, setTransactionCount] = useState<number>();
  useEffect(() => {
    getTokenTransferCount()
      .then((count) => setTransactionCount(count))
      .catch((error) => {
        showErrorToast({ id: 'transactionCountError', title: `Error fetching transaction count` }, error);
      });
  }, [showErrorToast]);

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
              <StatBox title="Total Supply Currently" data={totalSupply ? fromWei(totalSupply) : '-'} />
            </FadeAnimation>
            <FadeAnimation origin="right">
              <StatBox title="Deployed On Date" data={'To do'} />
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
              <StatBox title="Maximum Cap" data={maxCap ? fromWei(maxCap) : '-'} />
            </FadeAnimation>
            <FadeAnimation origin="right">
              <StatBox
                title="Total KIKI Transfers Until Now"
                data={transactionCount != null ? `${transactionCount}` : '-'}
              />
            </FadeAnimation>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};

export default Stats;
