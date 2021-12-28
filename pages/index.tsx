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
import { TransactionHistoryProvider } from '../components/hooks/useTransactionHistory';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>KikiriCoin</title>
      </Head>

      <main>
        <TransactionHistoryProvider>
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
        </TransactionHistoryProvider>
      </main>

      <Footer />
    </>
  );
};

export default Home;
