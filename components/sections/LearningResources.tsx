import { Container, Stack, Heading, Box, Flex, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import FadeAnimation from '../ui/FadeAnimation';
import DecoratedLink from '../ui/DecoratedLink';

import CryptoZombie from '../images/preview-crypto-zombie.png';
import DevelopCryptoGuideThumbnail from '../images/Develop_a_cryptocurrency-500.png';
import AyusoCoinIcon from '../images/ayusocoin_icon.svg';
import WhiteBoardCryptoIcon from '../images/whiteboard-crypto.jpeg';
import { useMemo } from 'react';
import { useTranslations } from 'next-intl';

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

const LearningResources = () => {
  const t = useTranslations('LearningResources');

  const learningResources = useMemo(
    () => [
      {
        link: 'https://cryptozombies.io/en/course',
        title: t('CryptoZombies.title'),
        description: t('CryptoZombies.description'),
        imageAlt: t('CryptoZombies.imageDescription'),
        Image: CryptoZombie,
      },
      {
        link: 'https://vitto.cc/how-to-develop-a-cryptocurrency-the-complete-2022-guide/',
        title: t('TokenDevelopmentGuide.title'),
        description: t('TokenDevelopmentGuide.description'),
        imageAlt: t('TokenDevelopmentGuide.imageDescription'),
        Image: DevelopCryptoGuideThumbnail,
      },
      {
        link: 'https://ayusocoin.com/',
        title: t('AyusoCoin.title'),
        description: t('AyusoCoin.description'),
        imageAlt: t('AyusoCoin.imageDescription'),
        Image: AyusoCoinIcon,
      },
      {
        link: 'https://www.youtube.com/c/WhiteboardCrypto',
        title: t('WhiteboardCrypto.title'),
        description: t('WhiteboardCrypto.description'),
        imageAlt: t('WhiteboardCrypto.imageDescription'),
        Image: WhiteBoardCryptoIcon,
      },
    ],
    [t]
  );

  return (
    <Box as="section" py={24} bg="gray.50">
      <Container maxW="container.sm" px={8}>
        <Heading as="h2" size="xl" fontWeight="bold" mb={4}>
          {t('title')}
        </Heading>

        <Stack spacing={8}>
          {learningResources.map((props) => (
            <FadeAnimation key={props.link} origin="bottom">
              <ResourceCard {...props} />
            </FadeAnimation>
          ))}
        </Stack>
      </Container>
    </Box>
  );
};

export default LearningResources;
