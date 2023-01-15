import React from 'react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react'

import dynamic from 'next/dynamic';


// Import the login handler/form dynamically with SSR disabled to prevent Next.js
// from "optimising" it with static rendering, which means it doesn't have access
// to router params.
const LoginHandler = dynamic(
  () => import('../components/customer/LoginHandler'),
  { ssr: false },
);


function LoginPage() {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <div className="container" style={{ padding: '50px 0 100px 0' }}>
      {!session ? (
        <div className="row">
          <div className="col-6">
            <h1 className="header">Supabase Auth + Storage</h1>
            <p className="">
              Experience our Auth and Storage through a simple profile management example. Create a
              user profile and upload an avatar image. Fast, simple, secure.
            </p>
          </div>
          <div className="col-6 auth-widget">
            <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} theme="light" magicLink={true} />
          </div>
        </div>
      ) : (
        <>
          <h3>Account</h3>
          {/* <Account session={session} /> */}
        </>
      )}
      <LoginHandler />
    </div>
  )
}

export default LoginPage;
