import React, { useState } from 'react'
import { Search, ShoppingCart } from 'lucide-react'
import { useCart } from '../context/CartContext'

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
          <div className="logo">AmazonClone</div>
          
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