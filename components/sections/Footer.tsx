import { Box, Center, UnorderedList, ListItem } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import DecoratedLink from '../ui/DecoratedLink';

const Footer = () => {
  const t = useTranslations('Footer');
  return (
    <Box as="footer" px={8} py={4}>
      <Center>
        <UnorderedList listStyleType="none">
          <ListItem>
            <DecoratedLink href="https://guillermodelapuente.com" isExternal>
              {t('authorWebsiteLink')}
            </DecoratedLink>
          </ListItem>
        </UnorderedList>
      </Center>
    </Box>
  );
};

export default Footer;
