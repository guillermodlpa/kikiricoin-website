import { Box, Center, UnorderedList, ListItem } from '@chakra-ui/react';
import { useTranslations } from 'next-intl';

import DecoratedLink from '../ui/DecoratedLink';

const Footer: React.FC = () => {
  const t = useTranslations('Footer');
  return (
    <Box as="footer" px={8} py={8}>
      <Center>
        <UnorderedList listStyleType="none" spacing={4} textAlign={'center'}>
          <ListItem>
            <DecoratedLink href="https://guillermodelapuente.com">{t('authorWebsiteLink')}</DecoratedLink>
          </ListItem>

          <ListItem>
            {t('logoAttributionText')}{' '}
            <DecoratedLink href="https://emojipedia.org/google/android-9.0/rooster/">
              {t('logoAttributionLink')}
            </DecoratedLink>
          </ListItem>
        </UnorderedList>
      </Center>
    </Box>
  );
};

export default Footer;
