import { Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useTranslations } from 'next-intl';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

const LanguageMenu: React.FC = () => {
  const t = useTranslations('LanguagesMenu');
  const selectedLocale = useRouter().locale;

  return (
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
  );
};

export default LanguageMenu;
