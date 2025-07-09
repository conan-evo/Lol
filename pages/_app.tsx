import '../globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { CartProvider } from '../context/CartContext'
import { CommunityProvider } from '../context/CommunityContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <CommunityProvider>
        <Component {...pageProps} />
      </CommunityProvider>
    </CartProvider>
  )
}