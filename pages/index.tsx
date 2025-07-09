import React, { useState, useMemo } from 'react'
import Head from 'next/head'
import { Header } from '../components/Header'
import { Navigation } from '../components/Navigation'
import { ProductCard } from '../components/ProductCard'
import { Cart } from '../components/Cart'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'
import { Product } from '../context/CartContext'

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All Products')
  const [searchTerm, setSearchTerm] = useState('')
  const { dispatch } = useCart()

  const filteredProducts = useMemo(() => {
    let filtered = products

    // Filter by category
    if (selectedCategory !== 'All Products') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }, [selectedCategory, searchTerm])

  const addToCart = (product: Product) => {
    dispatch({ type: 'ADD_TO_CART', payload: product })
  }

  return (
    <>
      <Head>
        <title>AmazonClone - Your Online Shopping Destination</title>
        <meta name="description" content="Shop the latest products with great deals and fast shipping." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Header onSearch={setSearchTerm} />
        <Navigation 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        
        <main className="products-container">
          <div className="container">
            <h1 className="section-title">
              {searchTerm ? `Search Results for "${searchTerm}"` : selectedCategory}
            </h1>
            
            {filteredProducts.length === 0 ? (
              <div style={{ 
                textAlign: 'center', 
                padding: '4rem 2rem', 
                color: '#666',
                fontSize: '1.2rem'
              }}>
                No products found. Try adjusting your search or category filter.
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                  />
                ))}
              </div>
            )}
          </div>
        </main>

        <Cart />
      </div>
    </>
  )
}