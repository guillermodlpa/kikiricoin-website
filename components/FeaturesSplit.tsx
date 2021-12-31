import { isValidElement } from 'react';
import { Box, Flex, Container, Stack, Heading, Text, VStack, Link, AlertDescription } from '@chakra-ui/react';
import NextImage from 'next/image';

import RoosterOriginal from './images/1f413-original.png';
import ethereumLogo from './images/ethereum-logo-2014-sq.png';
import solidityLogo from './images/Solidity_logo_uncropped.svg';
import metamaskLogo from './images/MetaMask_Fox.svg';
import alchemyLogo from './images/alchemy_logo.svg';
import maticTokenLogo from './images/matic-token-icon.webp';
import web3jsLogo from './images/web3js.svg';
import FadeAnimation from './FadeAnimation';

enum Position {
  Right = 'right',
  Left = 'left',
}

type StatBoxProps = {
  title: string;
  description: React.ReactNode;
  image: StaticImageData;
  imagePosition: Position;
  imageDescription: string;
  links: Array<{ href: string; label: string }> | undefined;
};

const Feature = ({ title, description, image, imagePosition, imageDescription, links }: StatBoxProps) => (
  <FadeAnimation origin={imagePosition}>
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
        {isValidElement(description) && description}
        {(links || []).map(({ href, label }) => (
          <Text key={href}>
            <Link href={href} color="brand" isExternal>
              {label}
            </Link>
          </Text>
        ))}
      </Stack>

      <Box w={{ base: '40%', md: '30%' }} mb={{ base: 12, md: 0 }} p={4}>
        <NextImage src={image} alt={imageDescription} title={imageDescription} />
      </Box>
    </Flex>
  </FadeAnimation>
);

const content = [
  {
    title: 'What is KikiriCoin?',
    description: (
      <>
        <Text>KikiriCoin is a virtual token that can be created (minted) and transfered between crypto accounts.</Text>
        <Text>
          KikiriCoin&apos;s allowed operations and balances are managed by a <b>smart contract</b>.
        </Text>
      </>
    ),
    links: undefined,
    image: RoosterOriginal,
    imageDescription: 'KikiriCoin logo',
  },
  {
    title: 'What is a smart contract?',
    description: (
      <>
        <Text>
          A short computer program that is executed a blockchain network. Smart contracts deployed on Ethereum, Polygon,
          and many other networks are developed with the programming language Solidity.
        </Text>
        <Text>
          The token is implemented using the ERC-20 interface, a standard used for creating and issuing smart contracts
          on the Ethereum blockchain. This makes KikiriCoin compatible with any system that supports Ethereum tokens.
        </Text>
      </>
    ),

    links: undefined,
    image: ethereumLogo,
    imageDescription: 'Ethereum logo',
  },
  {
    title: `How does this website interact with KikiriCoin?`,
    description: (
      <>
        <Text>This website uses Web3.js, a JavaScript client to interact with blockchain via Alchemy.</Text>
        <Text>
          It also interacts with browser wallets like <b>MetaMask</b> because they expose functions that enable websites
          to interact with it.
        </Text>
      </>
    ),
    links: [{ href: 'https://github.com/ChainSafe/web3.js', label: 'Web3.js library' }],
    image: web3jsLogo,
    imageDescription: 'Web3.js logo',
  },
  {
    title: `What is MetaMask?`,
    description: (
      <>
        <Text>
          MetaMask is a software cryptocurrency wallet used to interact with the Ethereum blockchain. It allows users to
          access their Ethereum wallet through a browser extension or mobile app, which can then be used to interact
          with decentralized applications like this website.
        </Text>
      </>
    ),
    links: [{ href: 'https://metamask.io/', label: 'MetaMask Official Site' }],
    image: metamaskLogo,
    imageDescription: 'MetaMask logo',
  },
  {
    title: 'Where is it deployed?',
    description: (
      <>
        <Text>
          KikiriCoin&apos;s smart contract is deployed on the Polygon Network. Polygon is a scaling solution for
          Ethereum that provides faster and cheaper transactions on Ethereum.
        </Text>
        <Text>
          Polygon uses the cryptocurrency <b>MATIC</b> to charge users for executing transactions and reward transaction
          validators around the world.
        </Text>
        <Text>
          MetaMask can also connect to the Polygon network, and be used to view balances and sign transactions on it.
        </Text>
      </>
    ),
    links: [
      { href: 'https://polygon.technology/', label: 'Polygon Official Site' },
      {
        href: 'https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/',
        label: 'Add Polygon Network to MetaMask',
      },
    ],
    image: maticTokenLogo,
    imageDescription: 'MATIC logo',
  },
  {
    title: `What is MATIC and how do I get it?`,
    description: (
      <>
        <Text>
          MATIC is the native cryptocurrency to the Polygon network. If you want to execute a transaction on Polygon,
          like to get some KikiriCoins, you need to have some MATIC token in your account.
        </Text>
        <Text>
          <b>In order to claim KIKI tokens, a user first needs to fund their crypto account with MATIC.</b> The claim
          operation should require less than 0.001 MATIC (~0.02€).
        </Text>
      </>
    ),
    links: [
      {
        href: 'https://medium.com/@nifty.pixels/getting-matic-on-the-polygon-network-with-crypto-com-48374d4d78d5',
        label: 'Medium: Getting MATIC on the Polygon network with Crypto.com',
      },
    ],
    image: maticTokenLogo,
    imageDescription: 'MATIC logo',
  },
];

const FeaturesSplit = () => (
  <Box as="section" py={24}>
    <Container maxW="container.sm">
      <VStack px={8} alignItems="stretch" spacing={16}>
        {content.map((row, index) => (
          <Feature
            key={row.title}
            title={row.title}
            description={row.description}
            links={row.links}
            image={row.image}
            imageDescription={row.imageDescription}
            imagePosition={index % 2 ? Position.Left : Position.Right}
          />
        ))}
      </VStack>
    </Container>
  </Box>
);

export default FeaturesSplit;
