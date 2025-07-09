import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Header } from '../components/Header'
import { CommunityCard } from '../components/CommunityCard'
import { useCommunity } from '../context/CommunityContext'
import { communities } from '../data/communities'
import { Community } from '../context/CommunityContext'
import { categories } from '../data/products'

export default function Communities() {
  const [selectedCategory, setSelectedCategory] = useState('All Communities')
  const [searchTerm, setSearchTerm] = useState('')
  const { state, dispatch } = useCommunity()
  const router = useRouter()

  useEffect(() => {
    // Load communities data
    dispatch({ type: 'SET_COMMUNITIES', payload: communities })
  }, [dispatch])

  const filteredCommunities = React.useMemo(() => {
    let filtered = state.communities

    // Filter by category
    if (selectedCategory !== 'All Communities') {
      filtered = filtered.filter(community => community.category === selectedCategory)
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(community =>
        community.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        community.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        community.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }, [state.communities, selectedCategory, searchTerm])

  const handleCommunityClick = (community: Community) => {
    dispatch({ type: 'SET_CURRENT_COMMUNITY', payload: community })
    router.push(`/community/${community.id}`)
  }

  const communityCategories = ['All Communities', ...categories.slice(1)] // Remove "All Products"

  return (
    <>
      <Head>
        <title>Communities - AmazonClone</title>
        <meta name="description" content="Join product communities and discuss your favorite items" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <Header onSearch={setSearchTerm} />
        
        <main className="communities-container">
          <div className="container">
            <div className="communities-header">
              <h1 className="page-title">
                {searchTerm ? `Search Results for "${searchTerm}"` : 'Communities'}
              </h1>
              <p className="page-description">
                Join communities to discuss products, share reviews, and connect with fellow shoppers
              </p>
            </div>

            <div className="communities-filters">
              <div className="category-filters">
                {communityCategories.map((category) => (
                  <button
                    key={category}
                    className={`category-filter ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {filteredCommunities.length === 0 ? (
              <div className="no-results">
                <h3>No communities found</h3>
                <p>Try adjusting your search or category filter.</p>
              </div>
            ) : (
              <div className="communities-grid">
                {filteredCommunities.map((community) => (
                  <CommunityCard
                    key={community.id}
                    community={community}
                    onClick={handleCommunityClick}
                  />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  )
}