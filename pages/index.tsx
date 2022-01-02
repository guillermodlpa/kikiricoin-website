import type { GetStaticPropsContext, NextPage } from 'next';
import Head from 'next/head';
import { MetaMaskProvider } from 'metamask-react';

import LanguageMenu from '../components/LanguageMenu';
import Hero from '../components/Hero';
import Stats from '../components/Stats';
import FeaturesSplit from '../components/FeaturesSplit';
import Faucet from '../components/Faucet';
import SourceCode from '../components/SourceCode';
import LearningResources from '../components/LearningResources';
import Footer from '../components/Footer';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>KikiriCoin</title>
      </Head>

      <main>
        <LanguageMenu />
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
