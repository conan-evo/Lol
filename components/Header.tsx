import React, { useState } from 'react'
import { Search, ShoppingCart, Users, Home } from 'lucide-react'
import { useCart } from '../context/CartContext'
import Link from 'next/link'

interface HeaderProps {
  onSearch: (term: string) => void
}

export const Header: React.FC<HeaderProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const { state, dispatch } = useCart()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="header-left">
            <Link href="/" className="logo">
              AmazonClone
            </Link>
            <nav className="main-nav">
              <Link href="/" className="nav-link">
                <Home size={16} />
                <span>Shop</span>
              </Link>
              <Link href="/communities" className="nav-link">
                <Users size={16} />
                <span>Communities</span>
              </Link>
            </nav>
          </div>
          
          <form className="search-bar" onSubmit={handleSearch}>
            <input
              type="text"
              className="search-input"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit" className="search-button">
              <Search size={20} />
            </button>
          </form>

          <div className="header-actions">
            <button 
              className="cart-button"
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            >
              <ShoppingCart size={24} />
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="cart-count">{totalItems}</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}