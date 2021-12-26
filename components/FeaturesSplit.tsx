import { Flex, Container, Stack, Heading, Box, Image, Text, VStack } from '@chakra-ui/react';

enum Position {
  Right = 'right',
  Left = 'left',
}

type StatBoxProps = {
  title: string;
  text: string;
  imagePosition: Position;
};

const Feature = ({ title, text, imagePosition }: StatBoxProps) => (
  <Flex
    direction={{ base: 'column', sm: imagePosition === Position.Right ? 'row' : 'row-reverse' }}
    pb={[8, 8, 24]}
    alignItems={{ base: 'center' }}
  >
    <Stack
      w={{ base: '80%', md: '70%' }}
      textAlign={['center', imagePosition === Position.Right ? 'left' : 'right']}
      justifyContent={'center'}
    >
      <Heading as="h2" size="lg" fontWeight="bold" color="primary.800" mb={4}>
        {title}
      </Heading>
      <Text>{text}</Text>
    </Stack>

    <Box w={{ base: '40%', md: '30%' }} mb={{ base: 12, md: 0 }}>
      <Image src={'/1f413.png'} alt="Logo" size="100%" />
    </Box>
  </Flex>
);

const FeaturesSplit = () => (
  <Container maxW="container.sm" as="section">
    <VStack px={8}>
      <Feature title="ERC20 Token" text="Lorem ipsum dolor sir amet" imagePosition={Position.Right} />
      <Feature title="Capped Supply" text="Lorem ipsum dolor sir amet" imagePosition={Position.Left} />
      <Feature title="Polygon" text="Lorem ipsum dolor sir amet" imagePosition={Position.Right} />
    </VStack>
  </Container>
);

export default FeaturesSplit;
