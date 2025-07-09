# Amazon Clone - E-commerce Web Application

A modern, responsive e-commerce web application built with Next.js, React, and TypeScript, featuring a design similar to Amazon.

## Features

- 🛍️ **Product Catalog**: Browse through a variety of products across different categories
- 🔍 **Search Functionality**: Search for products by name or category
- 🛒 **Shopping Cart**: Add, remove, and modify quantities of items in your cart
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Clean, professional design with smooth animations
- ⚡ **Fast Performance**: Built with Next.js for optimal loading speeds

## Categories

- Electronics
- Clothing
- Accessories
- Home & Kitchen
- Sports
- Furniture
- Beauty

## Technologies Used

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Custom CSS with responsive design
- **Icons**: Lucide React
- **State Management**: React Context API with useReducer
- **Image Optimization**: Next.js Image component

## Getting Started

### Prerequisites

- Node.js 16+ installed on your system
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <your-repo-url>
   cd amazon-clone
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Available Scripts

- `npm run dev` - Starts the development server
- `npm run build` - Builds the application for production
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint for code quality checks

## Project Structure

```
├── components/           # Reusable React components
│   ├── Header.tsx       # Navigation header with search
│   ├── Navigation.tsx   # Category navigation
│   ├── ProductCard.tsx  # Individual product display
│   └── Cart.tsx         # Shopping cart sidebar
├── context/             # React Context for state management
│   └── CartContext.tsx  # Shopping cart state and actions
├── data/                # Mock data and constants
│   └── products.ts      # Product catalog data
├── pages/               # Next.js pages
│   ├── _app.tsx         # App wrapper with providers
│   └── index.tsx        # Homepage
├── globals.css          # Global styles
└── README.md           # Project documentation
```

## Features in Detail

### Shopping Cart
- Add products to cart with a single click
- Adjust quantities with +/- buttons
- Remove items individually
- View total price calculation
- Persistent cart state during session

### Search & Filter
- Real-time search across product names and categories
- Category-based filtering
- Combined search and category filtering

### Responsive Design
- Mobile-first approach
- Flexible grid layout
- Touch-friendly interface
- Optimized for all screen sizes

## Customization

### Adding New Products
Edit `data/products.ts` to add new products to the catalog. Each product should include:
- `id`: Unique identifier
- `title`: Product name
- `price`: Product price
- `image`: Product image URL
- `rating`: Star rating (0-5)
- `reviewCount`: Number of reviews
- `category`: Product category

### Styling
Modify `globals.css` to customize the appearance. The CSS uses custom properties for easy theming.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by Amazon's user interface
- Product images from Unsplash
- Icons provided by Lucide React