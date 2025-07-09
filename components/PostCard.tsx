import React from 'react'
import { ArrowUp, ArrowDown, MessageCircle, Clock, ShoppingCart } from 'lucide-react'
import { Post } from '../context/CommunityContext'
import { useCommunity } from '../context/CommunityContext'
import { useCart } from '../context/CartContext'
import { products } from '../data/products'

interface PostCardProps {
  post: Post
  onClick?: (post: Post) => void
  showCommunity?: boolean
}

export const PostCard: React.FC<PostCardProps> = ({ post, onClick, showCommunity = false }) => {
  const { state: communityState, dispatch: communityDispatch } = useCommunity()
  const { dispatch: cartDispatch } = useCart()

  const currentVote = communityState.userVotes[post.id]
  const linkedProduct = post.productId ? products.find(p => p.id === post.productId) : null
  const community = communityState.communities.find(c => c.id === post.communityId)

  const handleVote = (voteType: 'up' | 'down') => {
    communityDispatch({
      type: 'VOTE_POST',
      payload: { postId: post.id, voteType }
    })
  }

  const handleAddToCart = () => {
    if (linkedProduct) {
      cartDispatch({ type: 'ADD_TO_CART', payload: linkedProduct })
    }
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))
    
    if (diffInHours < 1) return 'Just now'
    if (diffInHours < 24) return `${diffInHours}h ago`
    
    const diffInDays = Math.floor(diffInHours / 24)
    if (diffInDays < 7) return `${diffInDays}d ago`
    
    const diffInWeeks = Math.floor(diffInDays / 7)
    return `${diffInWeeks}w ago`
  }

  const getPostTypeColor = (type: string) => {
    switch (type) {
      case 'review': return '#10b981'
      case 'question': return '#3b82f6'
      case 'discussion': return '#8b5cf6'
      case 'share': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  return (
    <div className="post-card" onClick={onClick ? () => onClick(post) : undefined}>
      <div className="post-voting">
        <button
          className={`vote-button ${currentVote === 'up' ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            handleVote('up')
          }}
        >
          <ArrowUp size={16} />
        </button>
        <span className="vote-count">{post.votes}</span>
        <button
          className={`vote-button ${currentVote === 'down' ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            handleVote('down')
          }}
        >
          <ArrowDown size={16} />
        </button>
      </div>

      <div className="post-content">
        <div className="post-header">
          <div className="post-meta">
            <span 
              className="post-type"
              style={{ backgroundColor: getPostTypeColor(post.type) }}
            >
              {post.type}
            </span>
            {showCommunity && community && (
              <span className="post-community">r/{community.name}</span>
            )}
            <span className="post-author">by {post.author}</span>
            <span className="post-time">
              <Clock size={12} />
              {formatTimeAgo(post.createdAt)}
            </span>
          </div>
        </div>

        <h3 className="post-title">{post.title}</h3>
        <p className="post-text">{post.content}</p>

        {linkedProduct && (
          <div className="post-product">
            <div className="product-info">
              <img src={linkedProduct.image} alt={linkedProduct.title} />
              <div>
                <h4>{linkedProduct.title}</h4>
                <p className="product-price">${linkedProduct.price}</p>
              </div>
            </div>
            <button 
              className="add-to-cart-button"
              onClick={(e) => {
                e.stopPropagation()
                handleAddToCart()
              }}
            >
              <ShoppingCart size={16} />
              Add to Cart
            </button>
          </div>
        )}

        <div className="post-actions">
          <div className="action">
            <MessageCircle size={16} />
            <span>{post.commentCount} comments</span>
          </div>
        </div>
      </div>
    </div>
  )
}