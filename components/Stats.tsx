import { Flex, Container, Stack, Stat, StatNumber, StatLabel, Box } from '@chakra-ui/react';

import { fromWei } from '../util/conversions';
import { useEffect, useState } from 'react';
import { getTokenMaxCap, getTokenTransferCount, getTokenTotalSupply } from '../util/web3api';

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
  const [totalSupply, setTotalSupply] = useState<string>('0');
  useEffect(() => {
    getTokenTotalSupply().then((value) => setTotalSupply(value));
  }, []);

  const [maxCap, setMaxCap] = useState<string>();
  useEffect(() => {
    getTokenMaxCap().then((maxCap) => setMaxCap(maxCap));
  }, []);

  const [transactionCount, setTransactionCount] = useState<number>();
  useEffect(() => {
    getTokenTransferCount().then((count) => setTransactionCount(count));
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
            <StatBox title="Deployed On Date" data={'To do'} />
          </Flex>
          <Flex
            align="center"
            direction={{ base: 'column', sm: 'row' }}
            justify={{ base: 'stretch', sm: 'space-between' }}
            alignItems={{ base: 'stretch' }}
            px={8}
          >
            <StatBox title="Maximum Cap" data={maxCap ? fromWei(maxCap) : '-'} />
            <StatBox
              title="Total KIKI Transfers Until Now"
              data={transactionCount != null ? `${transactionCount}` : '-'}
            />
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};

export default Stats;
