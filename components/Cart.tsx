import React from 'react'
import { X, Plus, Minus } from 'lucide-react'
import { useCart } from '../context/CartContext'

export const Cart: React.FC = () => {
  const { state, dispatch } = useCart()

  if (!state.isOpen) return null

  const total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const updateQuantity = (id: number, newQuantity: number) => {
    dispatch({ 
      type: 'UPDATE_QUANTITY', 
      payload: { id, quantity: Math.max(0, newQuantity) }
    })
  }

  const removeItem = (id: number) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id })
  }

  return (
    <div className="cart-overlay" onClick={() => dispatch({ type: 'TOGGLE_CART' })}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2 className="cart-title">Shopping Cart</h2>
          <button 
            className="close-cart"
            onClick={() => dispatch({ type: 'TOGGLE_CART' })}
          >
            <X size={24} />
          </button>
        </div>

        {state.items.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
            Your cart is empty
          </div>
        ) : (
          <>
            <div className="cart-items">
              {state.items.map((item) => (
                <div key={item.id} className="cart-item">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="cart-item-image"
                    onError={(e) => {
                      e.currentTarget.src = 'https://via.placeholder.com/80x80?text=Product'
                    }}
                  />
                  <div className="cart-item-info">
                    <div className="cart-item-title">{item.title}</div>
                    <div className="cart-item-price">${item.price.toFixed(2)}</div>
                    <div className="quantity-controls">
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus size={16} />
                      </button>
                      <span style={{ margin: '0 0.5rem', minWidth: '20px', textAlign: 'center' }}>
                        {item.quantity}
                      </span>
                      <button 
                        className="quantity-btn"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus size={16} />
                      </button>
                      <button 
                        onClick={() => removeItem(item.id)}
                        style={{ 
                          marginLeft: '0.5rem', 
                          background: 'none', 
                          border: 'none', 
                          color: '#999', 
                          cursor: 'pointer' 
                        }}
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-total">
              <div className="total-amount">
                Total: ${total.toFixed(2)}
              </div>
              <button 
                className="checkout-btn"
                onClick={() => {
                  alert('Checkout functionality would be implemented here!')
                  dispatch({ type: 'CLEAR_CART' })
                  dispatch({ type: 'TOGGLE_CART' })
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}