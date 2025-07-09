import '../globals.css'
import type { AppProps } from 'next/app'
import { useState } from 'react'
import { CartProvider } from '../context/CartContext'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  )
}