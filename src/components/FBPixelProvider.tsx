'use client'
import React, { Suspense, useEffect } from 'react';
import { fbPageView } from '../conversion-api';
import { usePathname, useSearchParams } from 'next/navigation'

export function FBPixelProvider() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  useEffect(() => fbPageView, [pathname, searchParams])
  return (
    <Suspense fallback={null}>
      {null}
    </Suspense>
  )

}

export default FBPixelProvider;
