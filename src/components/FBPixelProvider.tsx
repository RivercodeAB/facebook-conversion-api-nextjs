'use client'
import { usePathname, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { fbPageView } from '../conversion-api';

export function FBPixelProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  useEffect(fbPageView, [pathname, searchParams]);
  return (
    <>
      {children}
    </>
  )
}

export default FBPixelProvider;
