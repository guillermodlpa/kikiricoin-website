import { Box, Container, Heading, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Link } from '@chakra-ui/react';

const TransactionHistory = () => (
  <Box as="section" py={24}>
    <Container maxW="container.md" px={8}>
      <Heading as="h1" size="xl" fontWeight="bold" color="primary.800" mb={4}>
        Transaction History
      </Heading>

      <Box overflow="auto">
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
              <Td>
                <Link color="brand" href="https://example.com" isExternal>
                  0x123123
                </Link>
              </Td>
              <Td>Transfer</Td>
              <Td>1 day 10 hrs ago</Td>
              <Td>
                <Link color="brand" href="https://example.com" isExternal>
                  0x123123
                </Link>
              </Td>
              <Td>
                <Link color="brand" href="https://example.com" isExternal>
                  0x123123
                </Link>
              </Td>
              <Td>1 KIKI</Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </Container>
  </Box>
);

export default TransactionHistory;
