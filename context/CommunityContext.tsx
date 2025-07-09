import React, { createContext, useContext, useReducer, ReactNode } from 'react'

export interface Community {
  id: string
  name: string
  description: string
  category: string
  memberCount: number
  createdAt: Date
  imageUrl?: string
}

export interface Post {
  id: string
  communityId: string
  title: string
  content: string
  author: string
  createdAt: Date
  votes: number
  commentCount: number
  productId?: number // Link to product if it's a product discussion
  type: 'discussion' | 'review' | 'question' | 'share'
}

export interface Comment {
  id: string
  postId: string
  content: string
  author: string
  createdAt: Date
  votes: number
  parentId?: string // For nested replies
  level: number
}

interface CommunityState {
  communities: Community[]
  posts: Post[]
  comments: Comment[]
  currentCommunity?: Community
  userVotes: { [key: string]: 'up' | 'down' | null } // postId or commentId -> vote
}

type CommunityAction =
  | { type: 'SET_COMMUNITIES'; payload: Community[] }
  | { type: 'ADD_COMMUNITY'; payload: Community }
  | { type: 'SET_POSTS'; payload: Post[] }
  | { type: 'ADD_POST'; payload: Post }
  | { type: 'SET_COMMENTS'; payload: Comment[] }
  | { type: 'ADD_COMMENT'; payload: Comment }
  | { type: 'SET_CURRENT_COMMUNITY'; payload: Community }
  | { type: 'VOTE_POST'; payload: { postId: string; voteType: 'up' | 'down' } }
  | { type: 'VOTE_COMMENT'; payload: { commentId: string; voteType: 'up' | 'down' } }

const CommunityContext = createContext<{
  state: CommunityState
  dispatch: React.Dispatch<CommunityAction>
} | null>(null)

const communityReducer = (state: CommunityState, action: CommunityAction): CommunityState => {
  switch (action.type) {
    case 'SET_COMMUNITIES':
      return { ...state, communities: action.payload }
    
    case 'ADD_COMMUNITY':
      return { ...state, communities: [...state.communities, action.payload] }
    
    case 'SET_POSTS':
      return { ...state, posts: action.payload }
    
    case 'ADD_POST':
      return { ...state, posts: [action.payload, ...state.posts] }
    
    case 'SET_COMMENTS':
      return { ...state, comments: action.payload }
    
    case 'ADD_COMMENT':
      return { ...state, comments: [...state.comments, action.payload] }
    
    case 'SET_CURRENT_COMMUNITY':
      return { ...state, currentCommunity: action.payload }
    
    case 'VOTE_POST':
      const { postId, voteType } = action.payload
      const currentVote = state.userVotes[postId]
      const isUpvote = voteType === 'up'
      
      let voteDelta = 0
      let newVote: 'up' | 'down' | null = voteType
      
      if (currentVote === voteType) {
        // Remove vote
        voteDelta = isUpvote ? -1 : 1
        newVote = null
      } else if (currentVote === null) {
        // Add vote
        voteDelta = isUpvote ? 1 : -1
      } else {
        // Change vote
        voteDelta = isUpvote ? 2 : -2
      }
      
      return {
        ...state,
        posts: state.posts.map(post =>
          post.id === postId ? { ...post, votes: post.votes + voteDelta } : post
        ),
        userVotes: { ...state.userVotes, [postId]: newVote }
      }
    
    case 'VOTE_COMMENT':
      const { commentId, voteType: commentVoteType } = action.payload
      const currentCommentVote = state.userVotes[commentId]
      const isCommentUpvote = commentVoteType === 'up'
      
      let commentVoteDelta = 0
      let newCommentVote: 'up' | 'down' | null = commentVoteType
      
      if (currentCommentVote === commentVoteType) {
        commentVoteDelta = isCommentUpvote ? -1 : 1
        newCommentVote = null
      } else if (currentCommentVote === null) {
        commentVoteDelta = isCommentUpvote ? 1 : -1
      } else {
        commentVoteDelta = isCommentUpvote ? 2 : -2
      }
      
      return {
        ...state,
        comments: state.comments.map(comment =>
          comment.id === commentId ? { ...comment, votes: comment.votes + commentVoteDelta } : comment
        ),
        userVotes: { ...state.userVotes, [commentId]: newCommentVote }
      }
    
    default:
      return state
  }
}

export const CommunityProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(communityReducer, {
    communities: [],
    posts: [],
    comments: [],
    userVotes: {}
  })

  return (
    <CommunityContext.Provider value={{ state, dispatch }}>
      {children}
    </CommunityContext.Provider>
  )
}

export const useCommunity = () => {
  const context = useContext(CommunityContext)
  if (!context) {
    throw new Error('useCommunity must be used within a CommunityProvider')
  }
  return context
}