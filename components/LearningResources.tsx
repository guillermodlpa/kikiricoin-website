import { Container, Stack, Heading, Box, Flex, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import FadeAnimation from './FadeAnimation';
import DecoratedLink from './DecoratedLink';

import CryptoZombie from './images/preview-crypto-zombie.png';
import DevelopCryptoGuideThumbnail from './images/Develop_a_cryptocurrency-500.png';
import AyusoCoinIcon from './images/ayusocoin_icon.svg';
import WhiteBoardCryptoIcon from './images/whiteboard-crypto.jpeg';

type ResourceCardProps = {
  title: string;
  description: string;
  link: string;
  Image?: StaticImageData;
  imageAlt?: string;
};

const MAX_TH_HEIGHT = 100;
const MAX_TH_WIDTH = 75;

const ResourceCard = ({ title, description, link, Image, imageAlt }: ResourceCardProps) => (
  <Flex
    shadow="md"
    borderWidth="1px"
    borderRadius="md"
    px={6}
    py={4}
    bg="white"
    direction={{ base: 'column', sm: 'row' }}
  >
    {Image && (
      <Box flexShrink={0} position="relative" mr={{ base: 0, sm: 4 }} mb={{ base: 4, sm: 0 }} textAlign="center">
        <NextImage
          src={Image}
          alt={imageAlt}
          height={Image.width > MAX_TH_WIDTH ? (MAX_TH_WIDTH * Image.height) / Image.width : MAX_TH_HEIGHT}
          width={Image.width > MAX_TH_WIDTH ? MAX_TH_WIDTH : (MAX_TH_HEIGHT * Image.width) / Image.height}
        />
      </Box>
    )}
    <Box flexGrow={1}>
      <Text fontWeight="medium">
        <DecoratedLink href={link} isExternal>
          {title}
        </DecoratedLink>
      </Text>
      <Text fontSize="sm">{description}</Text>
    </Box>
  </Flex>
);

const learningResources = [
  {
    link: 'https://cryptozombies.io/en/course',
    title: 'CryptoZombies Courses',
    description:
      "This is how I got started in blockchain development. The lessons are clear, very educational, and fun. The Solidity version used it's a bit out of date (0.5), but 95% of materials are accurate with Solidity 0.8 ",
    Image: CryptoZombie,
    imageAlt: 'Crypto Zombie thumbnail',
  },
  {
    link: 'https://vitto.cc/how-to-develop-a-cryptocurrency-the-complete-2022-guide/',
    title: 'How To Develop A Cryptocurrency – The Complete Guide (2022)',
    description:
      'Vittorio explains how to make an ERC-20 token leveraging implementations from OpenZeppelin, and deploy it to Polygon Network. This is pretty much the main resource that guided me while developing KikiriCoin.',
    Image: DevelopCryptoGuideThumbnail,
    imageAlt: 'Tutorial thumbnail',
  },
  {
    link: 'https://ayusocoin.com/',
    title:
      'A¥USOCoin - Una iniciativa para que nuestros políticos aprendan qué son las criptomonedas y los contratos inteligentes',
    description:
      'Íñigo develops an ERC-20 token without leveraging OpenZeppelin, which makes the implementation very explicit and a great learning resource. The smart contracts have plenty of comments (in Spanish) that helped me learn new concepts and see what an implementation looked like',
    Image: AyusoCoinIcon,
    imageAlt: 'AyusoCoin icon',
  },
  {
    link: 'https://www.youtube.com/c/WhiteboardCrypto',
    title: 'Whiteboard Crypto - YouTube channel for crypto education using analogies, stories, and examples',
    description:
      'When I need to learn about a concept, before diving into technical articles, I start with WhiteBoard Crypto. This channel has helped me a lot to understand complex crypto concepts, like rollups, flash loans, Solana, decentralized exchanges...',
    Image: WhiteBoardCryptoIcon,
    imageAlt: 'Whiteboard Crypto icon',
  },
];

const LearningResources = () => (
  <Box as="section" py={24} bg="gray.50">
    <Container maxW="container.md" px={8}>
      <Heading as="h1" size="xl" fontWeight="bold" mb={4}>
        Learning Resources
      </Heading>

      <Stack>
        {learningResources.map((props) => (
          <FadeAnimation key={props.link} origin="bottom">
            <ResourceCard {...props} />
          </FadeAnimation>
        ))}
      </Stack>
    </Container>
  </Box>
);

export default LearningResources;
