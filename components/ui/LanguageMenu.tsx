import { Box, Button, Menu, MenuButton, MenuList, MenuItem, useTheme } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const LanguageMenu = () => {
  const t = useTranslations('LanguagesMenu');
  const theme = useTheme();
  const selectedLocale = useRouter().locale;

  // We delay rendering to not render this menu on server side
  // because of a hidration problem with IDs
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    setRendered(true);
  }, []);
  if (!rendered) {
    return null;
  }

  return (
    <Box position="fixed" top={2} right={4} zIndex={theme.zIndices.docked}>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} variant="solid" colorScheme="blackAlpha">
          {t('buttonLabel')}
        </MenuButton>
        <MenuList>
          <NextLink locale="en" href="/" passHref>
            <MenuItem fontWeight={selectedLocale === 'en' ? 700 : 400}>English</MenuItem>
          </NextLink>
          <NextLink locale="es" href="/" passHref>
            <MenuItem fontWeight={selectedLocale === 'es' ? 700 : 400}>Español</MenuItem>
          </NextLink>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LanguageMenu;
