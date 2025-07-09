import React from 'react'
import { Star } from 'lucide-react'
import { Product } from '../context/CartContext'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const renderStars = (rating: number) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} size={16} fill="#ff9900" color="#ff9900" />)
    }

    if (hasHalfStar) {
      stars.push(<Star key="half" size={16} fill="#ff9900" color="#ff9900" style={{ opacity: 0.5 }} />)
    }

    const remainingStars = 5 - Math.ceil(rating)
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<Star key={`empty-${i}`} size={16} color="#ddd" />)
    }

    return stars
  }

  return (
    <div className="product-card">
      <img 
        src={product.image} 
        alt={product.title}
        className="product-image"
        onError={(e) => {
          e.currentTarget.src = 'https://via.placeholder.com/500x500?text=Product+Image'
        }}
      />
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        
        <div className="product-rating">
          <div className="stars">
            {renderStars(product.rating)}
          </div>
          <span className="rating-count">({product.reviewCount.toLocaleString()})</span>
        </div>
        
        <div className="product-price">
          ${product.price.toFixed(2)}
        </div>
        
        <button 
          className="add-to-cart"
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}