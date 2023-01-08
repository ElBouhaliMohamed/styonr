import React from 'react';
import Head from 'next/head';
import Root from '../components/common/Root';
import Footer from '../components/common/Footer';
import SocialMedia from '../components/common/SocialMedia';
import ExploreBanner from '../components/productAssets/ExploreBanner';
import HeroSection from '../components/homepage/HeroSection';
import HomeBanner from '../components/homepage/HomeBanner';
import CategoryBanner from '../components/homepage/CategoryBanner';
import ProductsBanner from '../components/homepage/ProductsBanner';

const Home = () => (
  <Root transparent={false}>
    <Head>
      <title>Home | commerce</title>
    </Head>

    <HeroSection />
    <ProductsBanner />
    <HomeBanner />
    <CategoryBanner />
    <SocialMedia />
    <ExploreBanner />
    <Footer />
  </Root>
);

export default Home;
