# Tollywood Threads

A cinematic e-commerce platform that connects fashion enthusiasts with character-inspired outfits from iconic Telugu movies. Shop the looks of your favorite Tollywood characters from films like Pushpa, Baahubali, Arjun Reddy, and more.

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/saiabhinavrentala-1919s-projects/v0-tollywood-fashion-website)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/Ao98z9TqYY3)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-blue?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)

## Overview

Tollywood Threads is a specialized fashion redirect platform designed for fans of Telugu cinema who want to emulate the distinctive styles of their favorite movie characters. Rather than traditional e-commerce, we curate and aggregate products from partner retailers that match iconic character aesthetics, creating an immersive shopping experience centered around Tollywood fashion.

## Features

### Core Features
- **Character Spotlights**: Curated collections highlighting the signature styles of iconic Tollywood characters
- **Movie Collections**: Browse fashion items organized by film (Pushpa, Baahubali, RRR, Arjun Reddy, Sita Ramam, Mirchi, Rangasthalam)
- **AI Style Matcher**: Intelligent recommendation system that analyzes user preferences and matches them with character styles
- **Cinematic Design**: Immersive dark mode UI with animated transitions, parallax scrolling, and genre-based color gradients
- **Floating Product Cards**: Interactive 3D product cards with motion effects and neon-accented glowing borders
- **Shopping Cart**: Full cart management with persistent state using React Context API
- **Affiliate Integration**: Seamless redirects to partner e-commerce sites (Amazon, Flipkart, Meesho, Van Heusen, etc.)
- **Responsive Design**: Optimized for mobile, tablet, and desktop experiences
- **Fast Performance**: Optimized images, code splitting, and lazy loading for lightning-fast page loads

### Advanced Features
- **Cinematic Animations**: Framer Motion-powered animations with staggered reveals and scroll effects
- **Iconic Moments Section**: Showcases memorable Telugu cinema moments with cultural context
- **Cinema Facts**: Educational content about Telugu film industry achievements
- **Google Authentication**: Secure sign-in with Google using OAuth
- **Dark Theme with Neon Accents**: Blue, pink, and green neon elements on dark backgrounds
- **Genre-Based Styling**: Dynamic color schemes based on movie genres (action, fantasy, romance, thriller)

## Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router for server-side rendering and optimization
- **React 18** - Component-based UI library
- **TypeScript** - Type-safe JavaScript for better developer experience
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Framer Motion** - Animation library for smooth, performant transitions
- **shadcn/ui** - High-quality accessible component library
- **Lucide React** - Consistent icon system

### Backend & APIs
- **Next.js App Router** - Server components and server actions for backend logic
- **Vercel AI SDK** - AI-powered style matching and recommendations
- **External APIs** - Integration with affiliate partner APIs

### Infrastructure & Deployment
- **Vercel** - Hosting and deployment platform with automatic CI/CD
- **Vercel Blob** - Image storage and optimization
- **GitHub** - Version control and repository management

### State Management
- **React Context API** - Global state management for cart and auth

## Installation

### Prerequisites
- Node.js 18 or higher
- npm, yarn, or pnpm package manager
- Git

### Local Setup

1. **Clone the repository**
```bash
git clone https://github.com/wizard-prog/v0-tollywood-fashion-website.git
cd v0-tollywood-fashion-website
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_APP_NAME=Tollywood Threads
```

4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

5. **Open your browser**
Navigate to `http://localhost:3000` to see the application running.

## Project Structure

```
v0-tollywood-fashion-website/
├── app/                          # Next.js App Router pages
│   ├── page.tsx                 # Home page with featured products
│   ├── layout.tsx               # Root layout with metadata
│   ├── collections/             # Movie collections pages
│   ├── characters/              # Character detail pages
│   ├── ai-style-matcher/        # AI recommendation page
│   ├── cart/                    # Shopping cart page
│   ├── login/                   # Authentication page
│   └── api/                     # API routes (tracking, etc.)
│
├── components/                   # Reusable React components
│   ├── cinematic-hero.tsx       # Hero section with parallax
│   ├── floating-product-card.tsx # 3D floating product cards
│   ├── cinematic-navbar.tsx     # Navigation bar
│   ├── character-spotlight.tsx  # Character showcase component
│   ├── cart-drawer.tsx          # Shopping cart sidebar
│   ├── auth-dropdown.tsx        # Authentication dropdown
│   └── ...                      # Other components
│
├── lib/                          # Utility functions and data
│   ├── data.ts                  # All product, character, and collection data
│   ├── types.ts                 # TypeScript interfaces and types
│   ├── cart-context.tsx         # Cart state management
│   └── ...                      # Other utilities
│
├── public/                       # Static assets
│   ├── images/
│   │   ├── characters/          # Character images
│   │   └── products/            # Product images
│   └── ...
│
├── app/globals.css              # Global styles and animations
├── tailwind.config.ts           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── next.config.js               # Next.js configuration
└── package.json                 # Project dependencies
```

## Usage Guide

### Browsing Collections
1. Navigate to "Collections" from the main menu
2. Select a movie collection (Pushpa, Baahubali, RRR, etc.)
3. View all character-inspired products in that collection
4. Click on any product card to see details and prices

### Using AI Style Matcher
1. Click on "AI Style Matcher" from the home page or menu
2. Upload a photo or use your camera
3. Answer questions about your style preferences (colors, styles, occasions)
4. Get personalized character matches based on your style
5. Explore recommended outfits and products

### Shopping
1. Browse products and click "Add to Cart" on any item
2. Click the shopping cart icon to view your cart
3. Adjust quantities or remove items as needed
4. Click "Buy Now" on any product to redirect to the affiliate store
5. Complete your purchase on the partner site

### Character Spotlights
1. Scroll through the home page to see featured characters
2. Click on a character card to view their full style guide
3. See all products inspired by that character
4. Learn about the character's movie and style influence

## Key Components Explained

### Floating Product Cards
Interactive product cards that float and glow on hover with genre-based color schemes. Built with Framer Motion for smooth animations and layered with glass morphism effects.

### AI Style Matcher
Server-powered recommendation engine using the Vercel AI SDK that analyzes user preferences and matches them with Tollywood character aesthetics. Returns personalized matches with reasoning and style recommendations.

### Cinematic Navbar
Navigation component featuring the Tollywood Threads logo, search functionality, authentication dropdown, shopping cart with item count badge, and responsive mobile menu.

### Shopping Cart Context
Global state management using React Context API for persistent cart data across page navigation. Includes add, remove, update quantity, and clear functionality.

## Performance Optimizations

- **Image Optimization**: Next.js Image component with automatic format conversion, responsive sizing, and blur placeholders
- **Code Splitting**: Dynamic imports for heavy components
- **Lazy Loading**: Images and components load only when visible in viewport
- **CSS Optimization**: Tailwind CSS purges unused styles in production
- **Minification**: Automatic minification of JS, CSS, and HTML
- **Caching**: Leverages browser cache and CDN for static assets

## Deployment

Your project is live at:

**[https://vercel.com/saiabhinavrentala-1919s-projects/v0-tollywood-fashion-website](https://vercel.com/saiabhinavrentala-1919s-projects/v0-tollywood-fashion-website)**

### Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Select your GitHub repository
- Configure environment variables
- Click "Deploy"

3. **Automatic Deployments**
Every push to the main branch will automatically trigger a new deployment.

## Future Roadmap

### Phase 2 Features
- **User Accounts**: Full user profile system with saved preferences
- **Wishlist System**: Save favorite items for later
- **Product Reviews**: User-generated reviews and ratings
- **Extended AI Features**: More sophisticated recommendation algorithms
- **Community Features**: User-generated style showcases

### Phase 3 Expansion
- **Direct Sales**: Integrate inventory management
- **Rental Service**: Seasonal costume rentals
- **Fashion Blog**: Style guides and tutorials
- **Influencer Integration**: Fashion influencer partnerships
- **Other Film Industries**: Expand to Bollywood, Kollywood, Kannada cinema

## Affiliate Partners

Currently integrated with:
- Amazon.in
- Flipkart
- Meesho
- Van Heusen
- Cinderella Closet
- Rajaau Ethnics
- The Bear House

## Contributing

We welcome contributions from the community!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use semantic HTML and accessibility standards
- Write clear commit messages
- Test across devices
- Update documentation as needed

## Troubleshooting

### Common Issues

**Port 3000 is already in use**
```bash
npm run dev -- -p 3001
```

**Images not loading**
- Check that image files exist in `/public/images/`
- Verify image paths in data files
- Check browser console for 404 errors

**Animations not working smoothly**
- Ensure Framer Motion is properly installed
- Check browser hardware acceleration is enabled

## Security

- HTTPS encryption for all data transmission
- Input validation and sanitization on all forms
- Secure authentication with OAuth
- Content Security Policy headers
- Regular security audits

## SEO Optimization

- Semantic HTML structure
- Open Graph and Twitter Card meta tags
- JSON-LD structured data
- Optimized meta descriptions
- Mobile-friendly responsive design
- Fast page load times

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## License

This project is licensed under the MIT License.

## Support & Contact

For issues, suggestions, or questions:
- Open an issue on GitHub
- Check existing documentation
- Review troubleshooting section

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel](https://vercel.com/)

---

*Automatically synced with your [v0.app](https://v0.app) deployments*

Continue building your app on: **[https://v0.app/chat/Ao98z9TqYY3](https://v0.app/chat/Ao98z9TqYY3)**
