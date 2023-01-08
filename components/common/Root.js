import React from 'react';
import Header from './Header';

export default function Root({ transparent, children }) {
  return (
    <>
      <Header />
      <div className={!transparent ? 'pt-[272px]' : ''}>
        {children}
      </div>
    </>
  );
}
