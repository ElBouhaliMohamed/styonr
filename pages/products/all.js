import React from 'react';
import Head from 'next/head';
import Root from '../../components/common/Root';
import ExploreBanner from '../../components/productAssets/ExploreBanner';
import Collections from '../../components/collections/Collections';
import SocialMedia from '../../components/common/SocialMedia';
import Footer from '../../components/common/Footer';
import commerce from '../../lib/commerce';

function AllProducts({ categories, products }) {
  return (
  <Root>
    <Head>
      <title>Collection</title>
    </Head>
    <Collections categories={categories} products={products} />
    <ExploreBanner />
    <SocialMedia />
    <Footer />
  </Root>)
};

export async function getStaticProps() {
  const [{data: products},{data: categories}] = 
    await Promise.all([commerce.products.list(), commerce.categories.list()]);
  return {
    props: {
      products,
      categories
    }
  }
}


export default AllProducts;
