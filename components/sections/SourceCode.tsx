import { Box, Container, Heading, UnorderedList, ListItem } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import DecoratedLink from '../ui/DecoratedLink';

const scanUrl = process.env.NEXT_PUBLIC_SCAN_ADDRESS_URL || '';
const tokenAddress = process.env.NEXT_PUBLIC_KIKIRICOIN_TOKEN_ADDRESS || '';
const faucetAddress = process.env.NEXT_PUBLIC_KIKIRICOIN_FAUCET_ADDRESS || '';

const SourceCode: React.FC = () => {
  const t = useTranslations('SourceCode');
  return (
    <Box as="section" py={24} id="source-code">
      <Container maxW="container.sm" px={8}>
        <Heading as="h2" size="lg" fontWeight="bold" mb={4}>
          {t('sourceCodeTitle')}
        </Heading>

        <UnorderedList mb={16}>
          <ListItem>
            {`${t('smartContractsRepo')}: `}
            <DecoratedLink href={`https://github.com/guillermodlpa/kikiricoin`}>
              https://github.com/guillermodlpa/kikiricoin
            </DecoratedLink>
          </ListItem>
          <ListItem>
            {`${t('websiteRepo')}: `}
            <DecoratedLink href={`https://github.com/guillermodlpa/kikiricoin-website`}>
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
            <DecoratedLink href={`${scanUrl}/${tokenAddress}`}>{tokenAddress}</DecoratedLink>
          </ListItem>
          <ListItem>
            {`${t('faucetSmartContract')}: `}
            <DecoratedLink href={`${scanUrl}/${faucetAddress}`}>{faucetAddress}</DecoratedLink>
          </ListItem>
        </UnorderedList>
      </Container>
    </Box>
  );
};

export default SourceCode;
