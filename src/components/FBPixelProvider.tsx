import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { fbPageView } from '../conversion-api';

const FBPixelProvider = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (!router.asPath.includes('?')) {
      fbPageView();
    }

    router.events.on('routeChangeComplete', fbPageView);
    return () => {
      router.events.off('routeChangeComplete', fbPageView);
    };
  }, [router.events]);

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {children}
    </>
  );
};

export default FBPixelProvider;
