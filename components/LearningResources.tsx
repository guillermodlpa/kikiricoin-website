import { Container, Stack, Heading, Box, Text, Link } from '@chakra-ui/react';

type ResourceCardProps = {
  title: string;
  // link: string;
  description: string;
};

const ResourceCard = ({ title, description }: ResourceCardProps) => (
  <Box shadow="md" borderWidth="1px" borderRadius="md" px={6} py={4} bg="white">
    <Text fontWeight="medium">
      <Link color="brand" href="https://example.com" isExternal>
        {title}
      </Link>
    </Text>
    <Text fontSize="sm">{description}</Text>
  </Box>
);

const learningResources = [
  {
    link: 'https://cryptozombies.io/en/course',
    title: 'CryptoZombies Courses',
    description:
      "This is how I got started in blockchain development. The lessons are clear, very educational, and fun. The Solidity version used it's a bit out of date (0.5), but 95% of materials are accurate with Solidity 0.8 ",
  },
  {
    link: 'https://vitto.cc/how-to-develop-a-cryptocurrency-the-complete-2022-guide/',
    title: 'How To Develop A Cryptocurrency – The Complete Guide (2022)',
    description:
      'Vittorio explains how to make an ERC-20 token leveraging implementations from OpenZeppelin, and deploy it to Polygon Network. This is pretty much the main resource that guided me while developing KikiriCoin.',
  },
  {
    link: 'https://ayusocoin.com/',
    title:
      'A¥USOCoin - Una iniciativa para que nuestros políticos aprendan qué son las criptomonedas y los contratos inteligentes',
    description:
      'Íñigo develops an ERC-20 token without leveraging OpenZeppelin, which makes the implementation very explicit and a great learning resource. The smart contracts have plenty of comments (in Spanish) that helped me learn new concepts and see what an implementation looked like',
  },
  {
    link: 'https://www.youtube.com/c/WhiteboardCrypto',
    title: 'Whiteboard Crypto - YouTube channel for crypto education using analogies, stories, and examples',
    description:
      'When I need to learn about a concept, before diving into technical articles, I start with WhiteBoard Crypto. This channel has helped me a lot to understand complex crypto concepts, like rollups, flash loans, Solana, decentralized exchanges...',
  },
];

const LearningResources = () => (
  <Box as="section" py={24} bg="gray.100">
    <Container maxW="container.md" px={8}>
      <Heading as="h1" size="xl" fontWeight="bold" color="primary.800" mb={4}>
        Learning Resources
      </Heading>

      <Stack>
        {learningResources.map((props) => (
          <ResourceCard key={props.link} {...props} />
        ))}
      </Stack>
    </Container>
  </Box>
);

export default LearningResources;
