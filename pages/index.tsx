import type { NextPage } from 'next';
import Head from 'next/head';

import Hero from '../components/Hero';
import Stats from '../components/Stats';
import FeaturesSplit from '../components/FeaturesSplit';
import Faucet from '../components/Faucet';
import TransactionHistory from '../components/TransactionHistory';
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
        <Faucet />
        <TransactionHistory />
        <LearningResources />
      </main>

      <Footer />
    </>
  );
};

export default Home;
