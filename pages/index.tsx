import type { GetStaticPropsContext, NextPage } from 'next';
import Head from 'next/head';
import { MetaMaskProvider } from 'metamask-react';

import LanguageMenu from '../components/ui/LanguageMenu';
import Hero from '../components/sections/Hero';
import Stats from '../components/sections/Stats';
import FeaturesSplit from '../components/sections/FeaturesSplit';
import Faucet from '../components/sections/Faucet';
import SourceCode from '../components/sections/SourceCode';
import LearningResources from '../components/sections/LearningResources';
import Footer from '../components/sections/Footer';
import FloatingMenuBar from '../components/ui/FloatingMenuBar';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>KikiriCoin</title>
      </Head>

      <main>
        <FloatingMenuBar>
          <LanguageMenu />
        </FloatingMenuBar>
        <Hero />
        <Stats />
        <FeaturesSplit />
        <MetaMaskProvider>
          <Faucet />
        </MetaMaskProvider>
        <SourceCode />
        <LearningResources />
      </main>

      <Footer />
    </>
  );
};

export default Home;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      // @see {@link https://next-intl-docs.vercel.app/docs/installation}
      messages: (await import(`../messages/index/${locale}.json`)).default,
    },
  };
}
