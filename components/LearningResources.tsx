import { Container, Stack, Heading, Box, Text } from '@chakra-ui/react';

type ResourceCardProps = {
  title: string;
  // link: string;
  description: string;
};

const ResourceCard = ({ title, description }: ResourceCardProps) => (
  <Box shadow="md" borderWidth="1px" borderRadius="md" px={6} py={4}>
    <Text>{title}</Text>
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
  <Container maxW="container.md" as="section" px={8} pb={[8, 8, 24]}>
    <Heading as="h1" size="xl" fontWeight="bold" color="primary.800" mb={4}>
      Learning Resources
    </Heading>

    <Stack>
      {learningResources.map((props) => (
        <ResourceCard key={props.title} {...props} />
      ))}
    </Stack>
  </Container>
);

export default LearningResources;
