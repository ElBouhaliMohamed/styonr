/* global process */
import '../style/scss/style.scss';
import 'swiper/components/effect-fade/effect-fade.scss';

import React, {useEffect, useState} from 'react';
import { useStore } from '../store';
import { Provider  } from 'react-redux';
import commerce from '../lib/commerce';
import { loadStripe } from '@stripe/stripe-js';
import { setCustomer } from '../store/actions/authenticateActions';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { SessionContextProvider } from '@supabase/auth-helpers-react'

const MyApp = ({Component, pageProps}) => {

  const store = useStore(pageProps.initialState);
  const [stripePromise, setStripePromise] = useState(null);
  const [supabase] = useState(() => createBrowserSupabaseClient())

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) { // has API key
      setStripePromise(loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY));
    }

    store.dispatch(setCustomer());

    commerce.products.list().then((res) => {
      store.dispatch({
        type: 'STORE_PRODUCTS',
        payload: res.data
      })
    });

    commerce.categories.list().then((res) => {
      store.dispatch({
        type: 'STORE_CATEGORIES',
        payload: res.data
      })
    });

  }, [store])

  return (
    <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
      <Provider store={store}>
        <Component
          {...pageProps}
          stripe={stripePromise}
        />
      </Provider>
    </SessionContextProvider>
  );

}

export default MyApp;
