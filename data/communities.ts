import { Community, Post, Comment } from '../context/CommunityContext'

export const communities: Community[] = [
  {
    id: 'electronics-hub',
    name: 'Electronics Hub',
    description: 'Discuss the latest gadgets, tech reviews, and electronic accessories',
    category: 'Electronics',
    memberCount: 15420,
    createdAt: new Date('2024-01-15'),
    imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=200&fit=crop'
  },
  {
    id: 'fashion-central',
    name: 'Fashion Central',
    description: 'Share style tips, clothing reviews, and fashion trends',
    category: 'Clothing',
    memberCount: 8950,
    createdAt: new Date('2024-02-01'),
    imageUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=200&fit=crop'
  },
  {
    id: 'home-kitchen',
    name: 'Home & Kitchen',
    description: 'Kitchen gadgets, home improvement, and cooking discussions',
    category: 'Home & Kitchen',
    memberCount: 12300,
    createdAt: new Date('2024-01-20'),
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop'
  },
  {
    id: 'fitness-gear',
    name: 'Fitness Gear',
    description: 'Sports equipment reviews, workout tips, and fitness discussions',
    category: 'Sports',
    memberCount: 6780,
    createdAt: new Date('2024-02-10'),
    imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop'
  },
  {
    id: 'accessory-zone',
    name: 'Accessory Zone',
    description: 'Bags, wallets, jewelry, and accessory recommendations',
    category: 'Accessories',
    memberCount: 4560,
    createdAt: new Date('2024-02-05'),
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=200&fit=crop'
  },
  {
    id: 'beauty-lounge',
    name: 'Beauty Lounge',
    description: 'Skincare, makeup, and beauty product discussions',
    category: 'Beauty',
    memberCount: 9840,
    createdAt: new Date('2024-01-25'),
    imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=200&fit=crop'
  }
]

export const samplePosts: Post[] = [
  {
    id: 'post-1',
    communityId: 'electronics-hub',
    title: 'Just got the Wireless Bluetooth Headphones - Amazing sound quality!',
    content: 'I\'ve been using these headphones for a week now and I\'m blown away by the sound quality. The bass is deep and the highs are crystal clear. Battery life easily lasts a full day. Highly recommend for anyone looking for premium audio experience.',
    author: 'TechEnthusiast92',
    createdAt: new Date('2024-03-15T10:30:00'),
    votes: 24,
    commentCount: 8,
    productId: 1,
    type: 'review'
  },
  {
    id: 'post-2',
    communityId: 'electronics-hub',
    title: 'Smart Fitness Watch vs Apple Watch - Which one should I buy?',
    content: 'I\'m torn between the Smart Fitness Watch with Heart Rate Monitor and the Apple Watch. Looking for something primarily for fitness tracking. What are your experiences?',
    author: 'FitnessTracker',
    createdAt: new Date('2024-03-14T15:45:00'),
    votes: 12,
    commentCount: 15,
    productId: 2,
    type: 'question'
  },
  {
    id: 'post-3',
    communityId: 'fashion-central',
    title: 'Organic Cotton T-Shirt Quality Check',
    content: 'Has anyone tried the Organic Cotton Comfortable T-Shirt? How\'s the quality after multiple washes? Looking for something that maintains its shape and color.',
    author: 'EcoFashionista',
    createdAt: new Date('2024-03-13T09:20:00'),
    votes: 18,
    commentCount: 6,
    productId: 3,
    type: 'question'
  },
  {
    id: 'post-4',
    communityId: 'home-kitchen',
    title: 'Coffee Maker Showdown: Manual vs Automatic',
    content: 'After extensive testing, I can say the Stainless Steel Coffee Maker is worth every penny. The 12-cup capacity is perfect for my family, and the build quality is exceptional. Here\'s my detailed review...',
    author: 'CoffeeConnoisseur',
    createdAt: new Date('2024-03-12T07:00:00'),
    votes: 31,
    commentCount: 12,
    productId: 5,
    type: 'review'
  },
  {
    id: 'post-5',
    communityId: 'fitness-gear',
    title: 'Running Shoes for Marathon Training',
    content: 'Training for my first marathon and need advice on the Premium Running Shoes. Are they suitable for long-distance running? Looking for comfort and durability.',
    author: 'MarathonDreamer',
    createdAt: new Date('2024-03-11T18:30:00'),
    votes: 16,
    commentCount: 9,
    productId: 6,
    type: 'question'
  },
  {
    id: 'post-6',
    communityId: 'electronics-hub',
    title: 'Wireless Charging Setup Tips',
    content: 'Share your wireless charging setups! Just got the Wireless Charging Pad and looking for tips to optimize charging speed and setup aesthetics.',
    author: 'WirelessGuru',
    createdAt: new Date('2024-03-10T14:15:00'),
    votes: 8,
    commentCount: 5,
    productId: 7,
    type: 'discussion'
  }
]

export const sampleComments: Comment[] = [
  {
    id: 'comment-1',
    postId: 'post-1',
    content: 'Totally agree! I\'ve had mine for 3 months and still loving them. The noise cancellation is also top-notch.',
    author: 'AudioPhile',
    createdAt: new Date('2024-03-15T11:00:00'),
    votes: 5,
    level: 0
  },
  {
    id: 'comment-2',
    postId: 'post-1',
    content: 'How\'s the comfort for long listening sessions? I wear headphones for 6+ hours daily.',
    author: 'LongListener',
    createdAt: new Date('2024-03-15T11:30:00'),
    votes: 2,
    level: 0
  },
  {
    id: 'comment-3',
    postId: 'post-1',
    content: '@LongListener They\'re very comfortable! Soft padding and lightweight design. No ear fatigue even after 8 hours.',
    author: 'TechEnthusiast92',
    createdAt: new Date('2024-03-15T12:00:00'),
    votes: 8,
    parentId: 'comment-2',
    level: 1
  },
  {
    id: 'comment-4',
    postId: 'post-2',
    content: 'I\'ve used both. Apple Watch has better app ecosystem, but this Smart Fitness Watch has better battery life and fitness tracking accuracy.',
    author: 'WearableTester',
    createdAt: new Date('2024-03-14T16:00:00'),
    votes: 15,
    level: 0
  },
  {
    id: 'comment-5',
    postId: 'post-2',
    content: 'For pure fitness tracking, go with the Smart Fitness Watch. Better value for money too.',
    author: 'BudgetFitness',
    createdAt: new Date('2024-03-14T16:30:00'),
    votes: 9,
    level: 0
  },
  {
    id: 'comment-6',
    postId: 'post-3',
    content: 'I\'ve washed mine 20+ times. Still looks new! The organic cotton quality is excellent.',
    author: 'SustainableShopper',
    createdAt: new Date('2024-03-13T10:00:00'),
    votes: 12,
    level: 0
  },
  {
    id: 'comment-7',
    postId: 'post-4',
    content: 'Great review! I\'m convinced. Adding to my cart now.',
    author: 'CoffeeLover123',
    createdAt: new Date('2024-03-12T08:00:00'),
    votes: 3,
    level: 0
  },
  {
    id: 'comment-8',
    postId: 'post-5',
    content: 'Used them for my half-marathon training. Excellent cushioning and support. Highly recommend!',
    author: 'RunningCoach',
    createdAt: new Date('2024-03-11T19:00:00'),
    votes: 7,
    level: 0
  }
]