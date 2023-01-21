import React, { useState } from 'react';
import commerce from '../../lib/commerce';
import { Collapse } from 'react-collapse';
import Head from 'next/head';
import ErrorPage from 'next/error'
import Root from '../../components/common/Root';
import CarouselImages from '../../components/productAssets/CarouselImages';
import ProductDetail from '../../components/productAssets/ProductDetail';
// import ClientReview from '../../components/productAssets/ClientReview';
import SuggestedProducts from '../../components/productAssets/SuggestedProducts';
// import ExploreBanner from '../../components/productAssets/ExploreBanner';
import Footer from '../../components/common/Footer';
// import SocialMedia from '../../components/common/SocialMedia';
import CategoryList from '../../components/products/CategoryList';
import reduceProductImages from '../../lib/reduceProductImages';
import Image from 'next/image';
import { SHOP_NAME } from '../../utils/constants';

function Product({ product, products }) {
  const [showShipping, setShowShipping] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const toggleShipping = () => {
    setShowShipping(!showShipping);
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  }


  // if (loading) {
  //   return <TemplatePage page={{ message: 'Loading...' }} />
  // }

  if (product === null) {
    return <ErrorPage statusCode={404} />
  }

  const images = reduceProductImages(product);
  return (
    <Root>
      <Head>
        <title>{product.name} | {SHOP_NAME} </title>
      </Head>
      <div className="py-5">
        <div className="main-product-content">
          {/* Sidebar */}
          <div className="product-sidebar">
            <CategoryList
              className="product-left-aside__category-list"
              current={product.categories[0] && product.categories[0].id}
            />
            <CarouselImages images={images} />
          </div>

          <div className="product-images">
            <div className="flex-grow-1">
              {Array.isArray(images) ? (images.map((image, i) => (
                <Image
                  key={i}
                  src={image}
                  alt="Produktbild"
                  width={920}
                  height={610}
                  className="mb-3 carousel-main-images"
                />
              ))) : (
                ''
              )}
            </div>
          </div>

          {/* Right Section - Product Details */}
          <div className="product-detail">
            <ProductDetail product={product} />

            <div
              onClick={toggleShipping}
              className="d-flex cursor-pointer py-3 justify-content-between font-weight-medium"
            >
              Shipping and returns
              <img src="/icon/plus.svg" />
            </div>
            <Collapse isOpened={showShipping}>
              <div className="pb-4 font-color-medium">
                Arrives in 5 to 7 days, returns accepted within 30
                days. For more information, click here.
              </div>
            </Collapse>
            <div className="h-1 border-bottom border-color-black" />
            <div
              onClick={toggleDetails}
              className="d-flex cursor-pointer py-3 justify-content-between font-weight-medium"
            >
              Details
              <img src="/icon/plus.svg" />
            </div>
            <Collapse isOpened={showDetails}>
              <div
                className="pb-4 font-color-medium"
                dangerouslySetInnerHTML={{
                  __html: product.description
                }}
              />
            </Collapse>
            <div className="h-1 borderbottom border-color-black" />
          </div>
        </div>
      </div>

      {/* <ClientReview /> */}
      <SuggestedProducts products={products} />
      {/* <ExploreBanner /> */}
      {/* <SocialMedia /> */}
      <Footer />
    </Root>
  );
}

export async function getStaticProps({ params }) {
  const { data: products } = await commerce.products.list();
  const product = await commerce.products.retrieve(params.permalink, { type: 'permalink ' });

  if (!product) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      product,
      products
    },
    revalidate: 60, // In seconds
  }
}

export async function getStaticPaths() {
  const products = await commerce.products.list();
  const paths = products.data.map((product) => ({
    params: { permalink: product.permalink },
  }));

  return {
    paths,
    fallback: false, // can also be true or 'blocking'
  }
}

export default Product