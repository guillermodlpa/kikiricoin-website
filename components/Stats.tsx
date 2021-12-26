import { Flex, Container, Stat, StatNumber, StatLabel } from '@chakra-ui/react';

type StatBoxProps = {
  title: string;
  data: string;
};

const StatBox = ({ title, data }: StatBoxProps) => (
  <Stat shadow="md" borderWidth="1px" borderRadius="md" px={6} py={10} mx={[4, 4, 8]} mb={[8, 0]}>
    <StatNumber fontSize="4xl">{data}</StatNumber>
    <StatLabel>{title}</StatLabel>
  </Stat>
);

const Stats = () => (
  <Container maxW="container.md" as="section" mb={32}>
    <Flex
      align="center"
      direction={{ base: 'column', sm: 'row' }}
      justify={{ base: 'stretch', sm: 'space-between' }}
      alignItems={{ base: 'stretch' }}
      px={8}
    >
      <StatBox title="Total Supply" data="25" />
      <StatBox title="Last Transaction" data="6d ago" />
    </Flex>
  </Container>
);

export default Stats;
