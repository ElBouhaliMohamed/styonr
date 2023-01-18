import React from 'react';

import Lottie from 'react-lottie';
import { connect } from 'react-redux';
import animationData from '../../lotties/add-to-cart.json';
import Image from 'next/image';
import spinner from '../../public/tail-spin.svg';

function Animation({ totalItems, isStopped, loading: { cart: isCartLoading }}) {
  const defaultOptions = {
    loop: false,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="cart-animation relative flex flex-row">
      <Lottie
        options={defaultOptions}
        height={24}
        width={24}
        isStopped={!isStopped}
      />
      <div className="text-xs font-bold">
        { isCartLoading ? <Image className='text-black  translate-x-2 -translate-y-1' width={16} height={16} alt='loading' src={spinner} /> : totalItems }
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    loading: state.loading
}), {})(Animation)