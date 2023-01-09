import React, { useEffect, useState } from 'react';
import Header from './Header';
import { getDeviceConfig } from '../../hooks/useTailwindBreakpoint'
import { useDispatch } from 'react-redux';
import { updateCurrentBreakpoint } from '../../store/actions/globalActions';

/* eslint-disable react-hooks/rules-of-hooks */
export default function Root({ transparent, children }) {
  // write current screen breakpoint into redux store
  if (process.browser) {
    const dispatch = useDispatch()
    const [width, setWidth] = useState(window.innerWidth)

    const handleResize = () => {
      setWidth(window.innerWidth)
    }
    window.addEventListener('resize', handleResize);

    useEffect(() => {
      const currentBreakpoint = getDeviceConfig(width)
      dispatch(updateCurrentBreakpoint(currentBreakpoint));
    }, [dispatch, width])
  }

  return (
    <>
      <Header />
      <div className={!transparent ? 'pt-[76px] sm:pt-[188px] md:pt-[192px] lg:pt-[272px]' : ''}>
        {children}
      </div>
    </>
  );
}
