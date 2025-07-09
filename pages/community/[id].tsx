import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Header } from '../../components/Header'
import { PostCard } from '../../components/PostCard'
import { useCommunity } from '../../context/CommunityContext'
import { communities, samplePosts, sampleComments } from '../../data/communities'
import { Users, Plus } from 'lucide-react'

export default function CommunityPage() {
  const [sortBy, setSortBy] = useState('hot')
  const { state, dispatch } = useCommunity()
  const router = useRouter()
  const { id } = router.query

  const community = state.communities.find(c => c.id === id) || 
                   communities.find(c => c.id === id)

  const communityPosts = state.posts.filter(post => post.communityId === id)

  useEffect(() => {
    // Load data
    dispatch({ type: 'SET_COMMUNITIES', payload: communities })
    dispatch({ type: 'SET_POSTS', payload: samplePosts })
    dispatch({ type: 'SET_COMMENTS', payload: sampleComments })
  }, [dispatch])

  const sortedPosts = React.useMemo(() => {
    const posts = [...communityPosts]
    
    switch (sortBy) {
      case 'hot':
        return posts.sort((a, b) => {
          const scoreA = a.votes + a.commentCount * 0.5
          const scoreB = b.votes + b.commentCount * 0.5
          return scoreB - scoreA
        })
      case 'new':
        return posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      case 'top':
        return posts.sort((a, b) => b.votes - a.votes)
      default:
        return posts
    }
  }, [communityPosts, sortBy])

  const handlePostClick = (post: any) => {
    router.push(`/post/${post.id}`)
  }

  if (!community) {
    return (
      <div>
        <Header onSearch={() => {}} />
        <div className="container">
          <h1>Community not found</h1>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{community.name} - AmazonClone Communities</title>
        <meta name="description" content={community.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Header onSearch={() => {}} />
        
        <main className="community-page">
          <div className="community-header">
            <div className="container">
              {community.imageUrl && (
                <div className="community-banner">
                  <img src={community.imageUrl} alt={community.name} />
                </div>
              )}
              
              <div className="community-info">
                <h1 className="community-title">{community.name}</h1>
                <p className="community-description">{community.description}</p>
                
                <div className="community-stats">
                  <div className="stat">
                    <Users size={16} />
                    <span>{community.memberCount.toLocaleString()} members</span>
                  </div>
                  <div className="community-category">
                    {community.category}
                  </div>
                </div>
                
                <button className="join-button">
                  <Plus size={16} />
                  Join Community
                </button>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="community-content">
              <div className="posts-section">
                <div className="posts-header">
                  <div className="sort-options">
                    <button
                      className={`sort-option ${sortBy === 'hot' ? 'active' : ''}`}
                      onClick={() => setSortBy('hot')}
                    >
                      Hot
                    </button>
                    <button
                      className={`sort-option ${sortBy === 'new' ? 'active' : ''}`}
                      onClick={() => setSortBy('new')}
                    >
                      New
                    </button>
                    <button
                      className={`sort-option ${sortBy === 'top' ? 'active' : ''}`}
                      onClick={() => setSortBy('top')}
                    >
                      Top
                    </button>
                  </div>
                  
                  <button className="create-post-button">
                    <Plus size={16} />
                    Create Post
                  </button>
                </div>

                <div className="posts-list">
                  {sortedPosts.length === 0 ? (
                    <div className="no-posts">
                      <h3>No posts yet</h3>
                      <p>Be the first to start a discussion in this community!</p>
                    </div>
                  ) : (
                    sortedPosts.map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        onClick={handlePostClick}
                      />
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}