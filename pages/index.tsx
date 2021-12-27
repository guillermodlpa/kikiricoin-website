import type { NextPage } from 'next';
import Head from 'next/head';
import { MetamaskStateProvider } from 'use-metamask';

import Hero from '../components/Hero';
import Stats from '../components/Stats';
import FeaturesSplit from '../components/FeaturesSplit';
import Faucet from '../components/Faucet';
import TransactionHistory from '../components/TransactionHistory';
import LearningResources from '../components/LearningResources';
import Footer from '../components/Footer';
import NoSsr from '../components/NoSsr';

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
        <NoSsr>
          <MetamaskStateProvider>
            <Faucet />
          </MetamaskStateProvider>
        </NoSsr>
        <TransactionHistory />
        <LearningResources />
      </main>

      <Footer />
    </>
  );
};

export default Home;
