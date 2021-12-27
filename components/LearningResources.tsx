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
    link: 'https://example',
    title: 'Aprender a desarrollar ERC20 tokens',
    description: 'Pefecto para aprender los primeros pasos',
  },
  {
    link: 'https://example',
    title: 'Aprender a desarrollar ERC20 tokens',
    description: 'Pefecto para aprender los primeros pasos',
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
          <ResourceCard key={props.title} {...props} />
        ))}
      </Stack>
    </Container>
  </Box>
);

export default LearningResources;
