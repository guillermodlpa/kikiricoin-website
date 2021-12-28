import { Box, Flex, Container, Stack, Heading, Text, VStack, Link } from '@chakra-ui/react';
import NextImage from 'next/image';

import ethereumLogo from './images/ethereum-logo-2014-sq.png';
import maticTokenLogo from './images/matic-token-icon.webp';

enum Position {
  Right = 'right',
  Left = 'left',
}

type StatBoxProps = {
  title: string;
  text: string;
  image: StaticImageData;
  imagePosition: Position;
  link?: JSX.Element;
};

const Feature = ({ title, text, image, imagePosition, link }: StatBoxProps) => (
  <Flex
    direction={{ base: 'column', sm: imagePosition === Position.Right ? 'row' : 'row-reverse' }}
    alignItems={{ base: 'center' }}
  >
    <Stack
      w={{ base: '80%', md: '70%' }}
      textAlign={['center', imagePosition === Position.Right ? 'left' : 'right']}
      justifyContent={'center'}
      ml={imagePosition === Position.Right ? 0 : 4}
      mr={imagePosition === Position.Right ? 4 : 0}
    >
      <Heading as="h2" size="lg" fontWeight="bold" color="primary.800" mb={4}>
        {title}
      </Heading>
      <Text>{text}</Text>
      {link && <Text>{link}</Text>}
    </Stack>

    <Box w={{ base: '40%', md: '30%' }} mb={{ base: 12, md: 0 }} p={4}>
      <NextImage src={image} alt="Logo" />
    </Box>
  </Flex>
);

const FeaturesSplit = () => (
  <Box as="section" py={24}>
    <Container maxW="container.sm">
      <VStack px={8} alignItems="stretch" spacing={16}>
        <Feature
          title="ERC-20 Token"
          text="ERC-20 is a standard interface that smart contracts can implement in order to be fungible tokens, like crypto currencies, and be compatible with exchanges and wallets."
          link={
            <Link href="https://ethereum.org/en/developers/docs/standards/tokens/erc-20/" color="brand" isExternal>
              Ethereum documentation
            </Link>
          }
          imagePosition={Position.Right}
          image={ethereumLogo}
        />
        <Feature
          title="Polygon Network"
          text="A scaling solution for Ethereum that provides faster and cheaper transactions on Ethereum."
          link={
            <Link href="https://polygon.technology/" color="brand" isExternal>
              Polygon Official Site
            </Link>
          }
          imagePosition={Position.Left}
          image={maticTokenLogo}
        />
      </VStack>
    </Container>
  </Box>
);

export default FeaturesSplit;
