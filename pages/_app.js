/* global process */
import '../style/scss/style.scss';
import 'swiper/components/effect-fade/effect-fade.scss';

import React, { useEffect, useState } from 'react';
import { useStore } from '../store';
import { Provider } from 'react-redux';
import { loadStripe } from '@stripe/stripe-js';
import { setCustomer } from '../store/actions/authenticateActions';
import { Analytics } from '@vercel/analytics/react';
import { Cabin } from '@next/font/google';

const rubik = Cabin({
  subsets: ['latin']
})

const MyApp = ({ Component, pageProps }) => {
  const store = useStore(pageProps.initialState);
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) { // has API key
      setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY));
    }

    store.dispatch(setCustomer());

    // commerce.categories.list().then((res) => {
    //   store.dispatch({
    //     type: 'STORE_CATEGORIES',
    //     payload: res.data
    //   })
    // });
    // commerce.products.list().then((res) => {
    //   store.dispatch({
    //     type: 'STORE_PRODUCTS',
    //     payload: res.data
    //   })
    // });

  }, [store])

  return (
    <main className={rubik.className}>
    <Provider store={store}>
      <Component
        {...pageProps}
        stripe={stripePromise}
      />
      <Analytics />
    </Provider>
    </main>
  );

}

export default MyApp;
