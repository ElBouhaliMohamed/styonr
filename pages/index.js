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
import { SHOPE_NAME } from '../utils/constants';

const Home = () => (
  <Root transparent={false}>
    <Head>
      {/* <title>{ SHOPE_NAME.toUpperCase() } SHOP </title> */}
    </Head>

    <ProductsBanner />
    <HeroSection />
    <HomeBanner />
    {/* <CategoryBanner /> */}
    {/* <ExploreBanner /> */}
    {/* <SocialMedia /> */}
    <Footer />
  </Root>
);

export default Home;
