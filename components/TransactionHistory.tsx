import { Container, Heading, Table, TableCaption, Thead, Tr, Th, Tbody, Td } from '@chakra-ui/react';

const TransactionHistory = () => (
  <Container maxW="container.md" as="section" px={8} pb={[8, 8, 24]}>
    <Heading as="h1" size="xl" fontWeight="bold" color="primary.800" mb={4}>
      Transaction History
    </Heading>

    <Table size="md">
      <TableCaption>Transaction history of KikiriCoin smart contract</TableCaption>
      <Thead>
        <Tr>
          <Th>Txn Hash</Th>
          <Th>Method</Th>
          <Th>Age</Th>
          <Th>From</Th>
          <Th>To</Th>
          <Th>Value</Th>
        </Tr>
      </Thead>
      <Tbody>
        <Tr>
          <Td>aaa</Td>
          <Td>Transfer</Td>
          <Td>1 day 10 hrs ago</Td>
          <Td>0x123123</Td>
          <Td>0xaknsdjak</Td>
          <Td>1 KIKI</Td>
        </Tr>
      </Tbody>
    </Table>
  </Container>
);

export default TransactionHistory;
