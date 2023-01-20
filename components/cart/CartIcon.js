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
    <div className={`cart-animation relative flex flex-row ${isCartLoading ? 'animate-bounce' : ''} `}>
      <Lottie
        options={defaultOptions}
        height={24}
        width={24}
        isStopped={!isStopped}
      />
      <div className="text-xs font-bold">
        { 
        isCartLoading ? 
        totalItems &&
        <Image 
          className='text-black font-extrabold -translate-y-1' 
          width={8} 
          height={8} 
          alt='loading' 
          src={spinner}
        />
        : totalItems
        }
      </div>
    </div>
  );
}

export default connect(
  (state) => ({
    loading: state.loading
}), {})(Animation)