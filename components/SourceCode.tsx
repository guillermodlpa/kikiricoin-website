import { Box, Container, Heading, Text, Link, Stat, Stack, UnorderedList, ListItem } from '@chakra-ui/react';

const scanUrl = process.env.NEXT_PUBLIC_SCAN_URL || '';
const tokenAddress = process.env.NEXT_PUBLIC_KIKIRICOIN_TOKEN_ADDRESS || '';
const faucetAddress = process.env.NEXT_PUBLIC_KIKIRICOIN_FAUCET_ADDRESS || '';

const formatAddress = (address: string, start = 4, end = 2) =>
  `${address.substring(0, start)}...${address.substring(address.length - end)}`;

const Card = ({
  title,
  description,
  linkHref,
  linkLabel,
}: {
  title: string;
  description: string;
  linkHref: string;
  linkLabel: string;
}) => (
  <Stat shadow="md" borderWidth="1px" borderRadius="md" px={6} py={10} bg="white">
    <Heading as="h4" size="md" mb={2}>
      {title}
    </Heading>
    <Text mb={2}>{description}</Text>
    <Text>
      <Link href={linkHref} isExternal color="branded">
        {linkLabel}
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

        <UnorderedList mb={16}>
          <ListItem>
            {`KikiriCoin Smart Contracts: `}
            <Link href={`https://github.com/guillermodlpa/kikiricoin`} isExternal color="branded">
              https://github.com/guillermodlpa/kikiricoin
            </Link>
          </ListItem>
          <ListItem>
            {`KikiriCoin Website (this page): `}
            <Link href={`https://github.com/guillermodlpa/kikiricoin-website`} isExternal color="branded">
              https://github.com/guillermodlpa/kikiricoin-website
            </Link>
          </ListItem>
        </UnorderedList>

        <Heading as="h2" size="lg" fontWeight="bold" color="primary.800" mb={4}>
          Deployed Contracts
        </Heading>

        <UnorderedList>
          <ListItem>
            {`Token Smart Contract: `}
            <Link href={`${scanUrl}/${tokenAddress}`} isExternal color="branded">
              {tokenAddress}
            </Link>
          </ListItem>
          <ListItem>
            {`Faucet Smart Contract: `}
            <Link href={`${scanUrl}/${faucetAddress}`} isExternal color="branded">
              {faucetAddress}
            </Link>
          </ListItem>
        </UnorderedList>
      </Container>
    </Box>
  );
};

export default SourceCode;
