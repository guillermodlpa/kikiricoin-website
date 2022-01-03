import { Box, Container, Heading, UnorderedList, ListItem } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import DecoratedLink from './DecoratedLink';

const scanUrl = process.env.NEXT_PUBLIC_SCAN_ADDRESS_URL || '';
const tokenAddress = process.env.NEXT_PUBLIC_KIKIRICOIN_TOKEN_ADDRESS || '';
const faucetAddress = process.env.NEXT_PUBLIC_KIKIRICOIN_FAUCET_ADDRESS || '';

const SourceCode = () => {
  const t = useTranslations('SourceCode');
  return (
    <Box as="section" py={24} id="source-code">
      <Container maxW="container.md" px={8}>
        <Heading as="h2" size="lg" fontWeight="bold" mb={4}>
          {t('sourceCodeTitle')}
        </Heading>

        <UnorderedList mb={16}>
          <ListItem>
            {`${t('smartContractsRepo')}: `}
            <DecoratedLink href={`https://github.com/guillermodlpa/kikiricoin`} isExternal>
              https://github.com/guillermodlpa/kikiricoin
            </DecoratedLink>
          </ListItem>
          <ListItem>
            {`${t('websiteRepo')}: `}
            <DecoratedLink href={`https://github.com/guillermodlpa/kikiricoin-website`} isExternal>
              https://github.com/guillermodlpa/kikiricoin-website
            </DecoratedLink>
          </ListItem>
        </UnorderedList>

        <Heading as="h2" size="lg" fontWeight="bold" mb={4}>
          {t('deployedContractsTitle')}
        </Heading>

        <UnorderedList>
          <ListItem>
            {`${t('tokenSmartContract')}: `}
            <DecoratedLink href={`${scanUrl}/${tokenAddress}`} isExternal>
              {tokenAddress}
            </DecoratedLink>
          </ListItem>
          <ListItem>
            {`${t('faucetSmartContract')}: `}
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
