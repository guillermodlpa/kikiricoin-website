import { Box, Container, Heading, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Link } from '@chakra-ui/react';

import useTransactionHistory, { TRANSACTION_DISPLAY_LIMIT } from './hooks/useTransactionHistory';

const TransactionHistory = () => {
  const transactions = useTransactionHistory();
  return (
    <Box as="section" py={24}>
      <Container maxW="container.md" px={8}>
        <Heading as="h1" size="xl" fontWeight="bold" color="primary.800" mb={4}>
          Transaction History
        </Heading>

        <Box overflow="auto">
          <Table size="md">
            <TableCaption>Last {TRANSACTION_DISPLAY_LIMIT} transactions on the KikiriCoin contract</TableCaption>
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
              {transactions.map((transaction) => (
                <Tr key={transaction.hash} fontSize="xs">
                  <Td>
                    <Link color="brand" href="https://example.com" isExternal title={transaction.hash}>
                      {`${transaction.hash.substring(0, 6)}...`}
                    </Link>
                  </Td>
                  <Td>{transaction.method || '-'}</Td>
                  <Td>{transaction.formattedDate || '-'}</Td>
                  <Td>
                    <Link color="brand" href="https://example.com" isExternal title={transaction.from}>
                      {`${transaction.from.substring(0, 6)}...`}
                    </Link>
                  </Td>
                  <Td>
                    <Link color="brand" href="https://example.com" isExternal title={transaction.to || ''}>
                      {transaction.to ? `${transaction.to.substring(0, 6)}...` : '-'}
                    </Link>
                  </Td>
                  <Td>{`${transaction.value.substring(0, 6)} KIKI`}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Container>
    </Box>
  );
};

export default TransactionHistory;
