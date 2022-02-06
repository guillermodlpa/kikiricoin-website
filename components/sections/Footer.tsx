import { Box, Center, UnorderedList, ListItem } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import DecoratedLink from '../ui/DecoratedLink';

const Footer = () => {
  const t = useTranslations('Footer');
  return (
    <Box as="footer" px={8} py={8}>
      <Center>
        <UnorderedList listStyleType="none" spacing={4} textAlign={'center'}>
          <ListItem>
            <DecoratedLink href="https://guillermodelapuente.com" isExternal>
              {t('authorWebsiteLink')}
            </DecoratedLink>
          </ListItem>

          <ListItem>
            The KikiriCoin logo is the{' '}
            <DecoratedLink href="https://emojipedia.org/google/android-9.0/rooster/" isExternal>
              Rooster emoji on Google Android 9.0
            </DecoratedLink>
          </ListItem>
        </UnorderedList>
      </Center>
    </Box>
  );
};

export default Footer;
