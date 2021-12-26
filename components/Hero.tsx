import { Flex, Container, Stack, HStack, Heading, Box, Image, Button, Text } from '@chakra-ui/react';

const Hero = () => (
  <Container maxW="container.md" as="section" mb={16}>
    <Flex
      align="center"
      justify={{ base: 'center', md: 'space-around', xl: 'space-between' }}
      direction={{ base: 'column-reverse', md: 'row' }}
      minH="60vh"
      px={8}
    >
      <Stack w={{ base: '80%', md: '60%' }}>
        <Heading as="h1" size="xl" fontWeight="bold" color="primary.800" mb={4}>
          KikiriCoin
        </Heading>

        <Text pb={4}>KikiriCoin</Text>

        <HStack>
          <Button borderRadius="8px" py="4" px="4" lineHeight="1" size="md">
            Learn More
          </Button>
        </HStack>
      </Stack>

      <Box w={{ base: '40%', md: '40%' }} mb={{ base: 12, md: 0 }}>
        <Image src={'/1f413.png'} alt="Logo" size="100%" rounded="100%" shadow="2xl" />
      </Box>
    </Flex>
  </Container>
);

export default Hero;
