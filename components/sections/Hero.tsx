import { Flex, Container, Stack, Heading, Box, Button, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import { useTranslations } from 'next-intl';

import CoinLogo from '../images/1f413-coin-color-adjusted.png';
import FadeAnimation from '../ui/FadeAnimation';
import richTextConfig from '../../util/nextIntlRichTextConfig';

const Hero: React.FC = () => {
  const t = useTranslations('Hero');
  return (
    <Box as="section" py={24} position="relative">
      <Box position="absolute" top={0} bottom={0} left={0} right={0} zIndex={-1} overflow="hidden" display="flex">
        <Box opacity={0.2} position="relative" width="100vw">
          <NextImage
            priority
            src={CoinLogo}
            alt={t('logoBackgroundAlt')}
            layout="fill"
            objectFit="cover"
            objectPosition={'40vw center'}
          />
        </Box>
      </Box>

      <Container maxW="container.sm" px={8}>
        <Flex
          align="center"
          justify={['center', 'space-around', null, 'space-between']}
          direction={['column-reverse', 'row']}
          minH="60vh"
        >
          <Stack w={['100%', '55%']} mr={[0, 6]} flexShrink={0}>
            <FadeAnimation origin="left">
              <Heading as="h1" size="2xl" fontWeight="bold" mb={4}>
                KikiriCoin
              </Heading>

              <Text pb={4}>{t.rich('funnySubtitle', richTextConfig)}</Text>

              <Text pb={4}>{t('subtitle')}</Text>
            </FadeAnimation>

            <FadeAnimation origin="bottom">
              <Stack direction={['column', null, 'row']} align="flex-start">
                <Button
                  borderRadius="8px"
                  py="4"
                  px="4"
                  lineHeight="1"
                  size="md"
                  colorScheme="primary"
                  href="#stats"
                  as="a"
                >
                  {t('learnMoreButton')}
                </Button>

                <Button
                  borderRadius="8px"
                  py="4"
                  px="4"
                  lineHeight="1"
                  size="md"
                  colorScheme="secondary"
                  href="#source-code"
                  as="a"
                >
                  {t('viewSourceCodeButton')}
                </Button>
              </Stack>
            </FadeAnimation>
          </Stack>

          <Box w={'40%'} mb={[12, 0]}>
            <FadeAnimation origin="bottom">
              <Box rounded="100%" shadow="lg" display="flex" border="solid 1px" borderColor="gray.300">
                <NextImage src={CoinLogo} alt={t('logoAlt')} />
              </Box>
            </FadeAnimation>
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Hero;
