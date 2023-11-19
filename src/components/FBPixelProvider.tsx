'use client'
import React, { Suspense, useEffect } from 'react';
import { fbPageView } from '../conversion-api';
import { usePathname, useSearchParams } from 'next/navigation'

export function FBPixelProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => fbPageView, [pathname, searchParams])
  return (
    <Suspense fallback={null}>
      {children}
    </Suspense>
  )

}

export default FBPixelProvider;
