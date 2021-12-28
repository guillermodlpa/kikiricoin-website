import { Flex, Container, Stack, Stat, StatNumber, StatLabel, Box } from '@chakra-ui/react';

import useTokenTransactionHistory from './hooks/useTokenTransactionHistory';
import useTotalSupply from './hooks/useTotalSupply';
import { fromWei } from '../util/conversions';
import { useEffect, useState } from 'react';
import { getTokenMaxCap, getTokenTransactionHistory } from '../util/web3api';

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
  const totalSupply = useTotalSupply();
  const lastTransaction = useTokenTransactionHistory()[0];

  const [maxCap, setMaxCap] = useState<string>();
  useEffect(() => {
    getTokenMaxCap().then((maxCap) => setMaxCap(maxCap));
  }, []);

  const [transactionCount, setTransactionCount] = useState<number>();
  const [lastTransactionDiff, setLastTransactionDiff] = useState<string>();
  useEffect(() => {
    getTokenTransactionHistory().then((history) => {
      setTransactionCount(history.length);
      const lastTransaction = history[history.length - 1];
      if (lastTransaction?.timestamp) {
        const diffTime = Math.abs(new Date().getTime() - new Date(lastTransaction.timestamp * 1000).getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setLastTransactionDiff(diffDays === 0 ? 'today' : `${diffDays}d ago`);
      }
    });
  }, []);

  return (
    <Box as="section" bg="gray.100" py={24} id="stats">
      <Container maxW="container.md">
        <Stack spacing={8}>
          <Flex
            align="center"
            direction={{ base: 'column', sm: 'row' }}
            justify={{ base: 'stretch', sm: 'space-between' }}
            alignItems={{ base: 'stretch' }}
            px={8}
          >
            <StatBox title="Total Supply Currently" data={totalSupply ? fromWei(totalSupply) : '-'} />
            <StatBox title="Last Transaction Date" data={lastTransactionDiff || '-'} />
          </Flex>
          <Flex
            align="center"
            direction={{ base: 'column', sm: 'row' }}
            justify={{ base: 'stretch', sm: 'space-between' }}
            alignItems={{ base: 'stretch' }}
            px={8}
          >
            <StatBox title="Maximum Cap" data={maxCap ? fromWei(maxCap) : '-'} />
            <StatBox title="Transactions" data={transactionCount ? `${transactionCount}` : '-'} />
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};

export default Stats;
