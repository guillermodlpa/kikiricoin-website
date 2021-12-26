import {
  Flex,
  Container,
  Stack,
  HStack,
  Heading,
  Box,
  Image,
  Button,
  Text,
  Stat,
  StatNumber,
  StatLabel,
} from '@chakra-ui/react';

const Faucet = () => (
  <Container maxW="container.md" as="section" mb={16}>
    <Flex
      align="center"
      justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
      direction={{ base: 'column', md: 'row' }}
      minH="60vh"
      px={8}
    >
      <Box w={{ base: '40%', md: '30%' }} mb={{ base: 12, md: 0 }}>
        <Image src={'/1f413.png'} alt="Logo" size="100%" opacity={0.5} />
      </Box>

      <Stack w={{ base: '80%', md: '70%' }} ml={[0, 0, 8]}>
        <Heading as="h2" size="xl" fontWeight="bold" color="primary.800" mb={4}>
          Faucet
        </Heading>

        <Text>KikiriCoin jha ajsd jasd asidas hidashd uoashdashdia bn ajdnsdi andis nin</Text>

        <HStack pt={8} spacing={8}>
          <Stat shadow="md" borderWidth="1px" borderRadius="md" px={6} py={10} mb={[8, 0]}>
            <StatNumber fontSize="4xl">100</StatNumber>
            <StatLabel>KIKI in pool</StatLabel>
          </Stat>
          <Stat shadow="md" borderWidth="1px" borderRadius="md" px={6} py={10} mb={[8, 0]}>
            <StatNumber fontSize="4xl">100</StatNumber>
            <StatLabel>Times used</StatLabel>
          </Stat>
        </HStack>

        <HStack pt={8}>
          <Button borderRadius="8px" py="4" px="4" lineHeight="1" size="md" variant={'solid'} colorScheme={'red'}>
            Connect Wallet
          </Button>
          <Button borderRadius="8px" py="4" px="4" lineHeight="1" size="md" disabled>
            Claim
          </Button>
        </HStack>
      </Stack>
    </Flex>
  </Container>
);

export default Faucet;
