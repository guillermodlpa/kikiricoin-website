import { isValidElement, useMemo } from 'react';
import { Box, Flex, Container, Stack, Heading, Text, VStack } from '@chakra-ui/react';
import NextImage from 'next/image';
import { useTranslations } from 'next-intl';

import RoosterOriginal from './images/1f413-original.png';
import ethereumLogo from './images/ethereum-logo-2014-sq.png';
import metamaskLogo from './images/MetaMask_Fox.svg';
import maticTokenLogo from './images/matic-token-icon.webp';
import web3jsLogo from './images/web3js.svg';
import FadeAnimation from './FadeAnimation';
import DecoratedLink from './DecoratedLink';
import richTextConfig from '../util/nextIntlRichTextConfig';

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
        <Heading as="h2" size="lg" fontWeight="bold" mb={4}>
          {title}
        </Heading>
        {isValidElement(description) && description}
        {(links || []).map(({ href, label }) => (
          <Text key={href}>
            <DecoratedLink href={href} color="primary" isExternal>
              {label}
            </DecoratedLink>
          </Text>
        ))}
      </Stack>

      <Box w={{ base: '40%', md: '30%' }} mb={{ base: 12, md: 0 }} p={4}>
        <NextImage src={image} alt={imageDescription} title={imageDescription} />
      </Box>
    </Flex>
  </FadeAnimation>
);

const FeaturesSplit = () => {
  const t = useTranslations('FeaturesSplit');

  const content = useMemo(
    () => [
      {
        title: t('KikiriCoin.title'),
        description: (
          <>
            <Text>{t('KikiriCoin.description.0')}</Text>
            <Text>{t.rich('KikiriCoin.description.1', richTextConfig)}</Text>
          </>
        ),
        links: undefined,
        image: RoosterOriginal,
        imageDescription: t('KikiriCoin.imageDescription'),
      },
      {
        title: t('SmartContract.title'),
        description: (
          <>
            <Text>{t('SmartContract.description.0')}</Text>
            <Text>{t('SmartContract.description.1')}</Text>
          </>
        ),

        links: undefined,
        image: ethereumLogo,
        imageDescription: t('SmartContract.imageDescription'),
      },
      {
        title: t('Web3js.title'),
        description: (
          <>
            <Text>{t('Web3js.description.0')}</Text>
            <Text>{t.rich('Web3js.description.1', richTextConfig)}</Text>
          </>
        ),
        links: [{ href: 'https://github.com/ChainSafe/web3.js', label: t('Web3js.links.0') }],
        image: web3jsLogo,
        imageDescription: t('Web3js.imageDescription'),
      },
      {
        title: t('MetaMask.title'),
        description: (
          <>
            <Text>{t('MetaMask.description.0')}</Text>
          </>
        ),
        links: [{ href: 'https://metamask.io/', label: t('MetaMask.links.0') }],
        image: metamaskLogo,
        imageDescription: t('MetaMask.imageDescription'),
      },
      {
        title: t('PolygonNetwork.title'),
        description: (
          <>
            <Text>{t('PolygonNetwork.description.0')}</Text>
            <Text>{t.rich('PolygonNetwork.description.1', richTextConfig)}</Text>
            <Text>{t('PolygonNetwork.description.2')}</Text>
          </>
        ),
        links: [
          { href: 'https://polygon.technology/', label: t('PolygonNetwork.links.0') },
          {
            href: 'https://docs.polygon.technology/docs/develop/metamask/config-polygon-on-metamask/',
            label: t('PolygonNetwork.links.1'),
          },
        ],
        image: maticTokenLogo,
        imageDescription: t('PolygonNetwork.imageDescription'),
      },
      {
        title: t('MATIC.title'),
        description: (
          <>
            <Text>{t('MATIC.description.0')}</Text>
            <Text>{t.rich('MATIC.description.1', richTextConfig)}</Text>
          </>
        ),
        links: [
          {
            href: 'https://medium.com/@nifty.pixels/getting-matic-on-the-polygon-network-with-crypto-com-48374d4d78d5',
            label: t('MATIC.links.0'),
          },
        ],
        image: maticTokenLogo,
        imageDescription: t('MATIC.imageDescription'),
      },
    ],
    [t]
  );
  return (
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
};

export default FeaturesSplit;
