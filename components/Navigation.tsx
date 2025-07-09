import React from 'react'
import { categories } from '../data/products'

interface NavigationProps {
  selectedCategory: string
  onCategoryChange: (category: string) => void
}

export const Navigation: React.FC<NavigationProps> = ({ 
  selectedCategory, 
  onCategoryChange 
}) => {
  return (
    <nav className="nav">
      <div className="container">
        <div className="nav-content">
          {categories.map((category) => (
            <button
              key={category}
              className="nav-item"
              onClick={() => onCategoryChange(category)}
              style={{
                background: selectedCategory === category ? 'rgba(255,255,255,0.2)' : 'transparent'
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}