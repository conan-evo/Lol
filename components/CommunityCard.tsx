import React from 'react'
import { Users, Calendar } from 'lucide-react'
import { Community } from '../context/CommunityContext'

interface CommunityCardProps {
  community: Community
  onClick: (community: Community) => void
}

export const CommunityCard: React.FC<CommunityCardProps> = ({ community, onClick }) => {
  const formatMemberCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`
    }
    return count.toString()
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    })
  }

  return (
    <div 
      className="community-card"
      onClick={() => onClick(community)}
    >
      {community.imageUrl && (
        <div className="community-image">
          <img src={community.imageUrl} alt={community.name} />
        </div>
      )}
      
      <div className="community-content">
        <h3 className="community-name">{community.name}</h3>
        <p className="community-description">{community.description}</p>
        
        <div className="community-meta">
          <div className="community-stats">
            <div className="stat">
              <Users size={16} />
              <span>{formatMemberCount(community.memberCount)} members</span>
            </div>
            <div className="stat">
              <Calendar size={16} />
              <span>Created {formatDate(community.createdAt)}</span>
            </div>
          </div>
          <div className="community-category">
            {community.category}
          </div>
        </div>
      </div>
    </div>
  )
}