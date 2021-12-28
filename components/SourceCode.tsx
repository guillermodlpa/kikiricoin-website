import { Box, Container, Heading, Text, Link, Wrap, Stat } from '@chakra-ui/react';

const Card = ({ title, description, link }: { title: string; description: string; link: string }) => (
  <Stat shadow="md" borderWidth="1px" borderRadius="md" px={6} py={10} bg="white">
    <Heading as="h4" size="md" mb={2}>
      {title}
    </Heading>
    <Text mb={2}>{description}</Text>
    <Text>
      <Link href={link} isExternal color="branded">
        {link}
      </Link>
    </Text>
  </Stat>
);

const SourceCode = () => {
  return (
    <Box as="section" py={24} id="source-code">
      <Container maxW="container.md" px={8}>
        <Heading as="h2" size="lg" fontWeight="bold" color="primary.800" mb={4}>
          Source Code
        </Heading>

        <Wrap mb={16}>
          <Card
            title="KikiriCoin Smart Contracts"
            description="Smart contract implementation of the KIKI ERC-20 token, using OpenZeppelin. You'll find also the faucet's smart contract and unit tests."
            link="https://example.com"
          />

          <Card
            title="Website"
            description="Implementation of this website, using NextJS."
            link="https://example.com"
          />
        </Wrap>

        <Heading as="h2" size="lg" fontWeight="bold" color="primary.800" mb={4}>
          Deployed Contracts
        </Heading>

        <Wrap>
          <Card title="Token Smart Contract" description="" link="https://example.com" />
          <Card title="Faucet Smart Contract" description="" link="https://example.com" />
        </Wrap>
      </Container>
    </Box>
  );
};

export default SourceCode;
