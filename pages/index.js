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
import { SHOP_NAME } from '../utils/constants';
import commerce from '../lib/commerce';

const Home = ({ products }) => (
  <Root transparent={false}>
    <Head>
      {/* <title>{ SHOP_NAME } SHOP </title> */}
    </Head>

    <ProductsBanner products={products} />
    <HeroSection />
    <HomeBanner />
    {/* <CategoryBanner /> */}
    {/* <ExploreBanner /> */}
    {/* <SocialMedia /> */}
    <Footer />
  </Root>
);

export async function getStaticProps() {
  const res = await commerce.products.list();
  return {
    props: {
      products: res.data,
      revalidate: 60,
    }
  }
}

export default Home;
