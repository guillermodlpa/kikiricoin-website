import type { NextPage } from 'next';
import Head from 'next/head';
import { MetaMaskProvider } from 'metamask-react';

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
