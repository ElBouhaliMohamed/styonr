import React from 'react';
import PropTypes from 'prop-types';
import ProductRow from '../products/ProductRow';

function SuggestedProducts(props) {
  const { products } = props;
  console.log(props);
  return (
    <div className="custom-container py-5 my-5">
      <div className="d-flex flex-column align-items-center mb-5 pb-4">
        <p className="font-color-medium mb-4">
          Suggested products
        </p>
        <p
          className="text-center font-size-display1 mb-3 font-weight-medium"
          style={{ maxWidth: '32rem' }}
        >
          You may also like to check out these products.
        </p>
      </div>
      <ProductRow products={products.slice(0, 4)} />
    </div>
  );
}


export default SuggestedProducts;
