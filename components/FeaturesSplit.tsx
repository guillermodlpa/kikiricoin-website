import { Box, Flex, Container, Stack, Heading, Text, VStack, Link } from '@chakra-ui/react';
import NextImage from 'next/image';

import ethereumLogo from './images/ethereum-logo-2014-sq.png';
import solidityLogo from './images/Solidity_logo.svg';
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
  imageDescription: string;
  link?: JSX.Element;
};

const Feature = ({ title, text, image, imagePosition, imageDescription, link }: StatBoxProps) => (
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
      <NextImage src={image} alt={imageDescription} title={imageDescription} />
    </Box>
  </Flex>
);

const FeaturesSplit = () => (
  <Box as="section" py={24}>
    <Container maxW="container.sm">
      <VStack px={8} alignItems="stretch" spacing={16}>
        <Feature
          title="What is KikiriCoin?"
          text="KikiriCoin is a virtual token that can be created (minted) and transfered between crypto accounts. KikiriCoin's allowed operations and balances are managed by a smart contract."
          link={undefined}
          imagePosition={Position.Right}
          image={ethereumLogo}
          imageDescription="Ethereum logo"
        />

        <Feature
          title="What is a smart contract?"
          text="A short computer program that is executed a blockchain network. Smart contracts deployed on Ethereum, Polygon, and many other networks are developed with the programming language Solidity."
          link={undefined}
          imagePosition={Position.Left}
          image={solidityLogo}
          imageDescription="Solidity logo"
        />

        <Feature
          title="How is it implemented?"
          text="The token is implemented using the ERC-20 interface, a standard used for creating and issuing smart contracts on the Ethereum blockchain. This enables KikiriCoin to work seamlessly with any system that supports Ethereum tokens."
          link={
            <Link href="https://ethereum.org/en/developers/docs/standards/tokens/erc-20/" color="brand" isExternal>
              ERC-20 documentation
            </Link>
          }
          imagePosition={Position.Right}
          image={ethereumLogo}
          imageDescription="aaa logo"
        />
        <Feature
          title="Where is it deployed?"
          text="In the Polygon Network. Polygon is a scaling solution for Ethereum that provides faster and cheaper transactions on Ethereum. Polygon uses the cryptocurrency MATIC to charge users for executing transactions and reward transaction validators around the world."
          link={
            <Link href="https://polygon.technology/" color="brand" isExternal>
              Polygon Official Site
            </Link>
          }
          imagePosition={Position.Left}
          image={maticTokenLogo}
          imageDescription="MATIC logo"
        />
        <Feature
          title="How can one interact with KikiriCoin's smart contract?"
          text="To interact with KikiriCoin, one needs to connect directly with a Polygon node or using a provider like Infura or Alchemy. Read operations, like checking your balance, are free. Transactions that modify the state in the blockchain, like claiming tokens or transferring them, require paying for computing resources with a bit of MATIC token."
          link={
            <Link href="https://www.alchemy.com/" color="brand" isExternal>
              Alchemy Official Site
            </Link>
          }
          imagePosition={Position.Right}
          image={maticTokenLogo}
          imageDescription="MATIC logo"
        />
      </VStack>
    </Container>
  </Box>
);

export default FeaturesSplit;
