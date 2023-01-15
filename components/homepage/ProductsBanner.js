import React from 'react';
import Link from 'next/link';
import ProductRow from '../products/ProductRow';

function ProductsBanner({ products }) {

  return (
    <div className="custom-container py-5 my-5">
      <div className="d-flex flex-column align-items-center mb-5 pb-4">
        <p className="font-color-medium mb-4">
          Introducing Our Latest Products
        </p>
        <p
          className="text-center font-size-display1 mb-3 font-weight-medium"
          style={{ maxWidth: '32rem' }}
        >
          Limited reservations on upcoming products and restocks.
        </p>
        <Link href="/collection" className="d-flex py-3 align-items-center font-color-black borderbottom border-color-black">
          <p className="mr-3">Mehr Produkte</p>
          <img src="/icon/arrow-long-right.svg" />
        </Link>
      </div>
      <ProductRow products={products.slice(0, 4)} />
    </div>
  );
}

export default ProductsBanner;
