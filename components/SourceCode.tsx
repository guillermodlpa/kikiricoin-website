import { Box, Container, Heading, UnorderedList, ListItem } from '@chakra-ui/react';
import DecoratedLink from './DecoratedLink';

const scanUrl = process.env.NEXT_PUBLIC_SCAN_URL || '';
const tokenAddress = process.env.NEXT_PUBLIC_KIKIRICOIN_TOKEN_ADDRESS || '';
const faucetAddress = process.env.NEXT_PUBLIC_KIKIRICOIN_FAUCET_ADDRESS || '';

const SourceCode = () => {
  return (
    <Box as="section" py={24} id="source-code">
      <Container maxW="container.md" px={8}>
        <Heading as="h2" size="lg" fontWeight="bold" mb={4}>
          Source Code
        </Heading>

        <UnorderedList mb={16}>
          <ListItem>
            {`KikiriCoin Smart Contracts: `}
            <DecoratedLink href={`https://github.com/guillermodlpa/kikiricoin`} isExternal>
              https://github.com/guillermodlpa/kikiricoin
            </DecoratedLink>
          </ListItem>
          <ListItem>
            {`KikiriCoin Website (this page): `}
            <DecoratedLink href={`https://github.com/guillermodlpa/kikiricoin-website`} isExternal>
              https://github.com/guillermodlpa/kikiricoin-website
            </DecoratedLink>
          </ListItem>
        </UnorderedList>

        <Heading as="h2" size="lg" fontWeight="bold" mb={4}>
          Deployed Contracts
        </Heading>

        <UnorderedList>
          <ListItem>
            {`Token Smart Contract: `}
            <DecoratedLink href={`${scanUrl}/${tokenAddress}`} isExternal>
              {tokenAddress}
            </DecoratedLink>
          </ListItem>
          <ListItem>
            {`Faucet Smart Contract: `}
            <DecoratedLink href={`${scanUrl}/${faucetAddress}`} isExternal>
              {faucetAddress}
            </DecoratedLink>
          </ListItem>
        </UnorderedList>
      </Container>
    </Box>
  );
};

export default SourceCode;
