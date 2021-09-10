import React, { useEffect } from 'react';
import { useRouter } from 'next/router'; // eslint-disable-line
import { fbPageView } from '../index';

type Props = {
  children: JSX.Element
};

const FBPixelWrapper: React.FC<Props> = ({ children }) => {
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

  return children;
};

export default FBPixelWrapper;
