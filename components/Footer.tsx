import { Box, Center, Link, UnorderedList, ListItem } from '@chakra-ui/react';

import DecoratedLink from './DecoratedLink';

const Footer = () => (
  <Box as="footer" px={8} py={4}>
    <Center>
      <UnorderedList listStyleType="none">
        <ListItem>
          <DecoratedLink href="https://guillermodelapuente.com" isExternal>{`Author's website`}</DecoratedLink>
        </ListItem>
      </UnorderedList>
    </Center>
  </Box>
);

export default Footer;
