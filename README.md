# Tollywood Threads

E-commerce platform connecting fashion fans with character-inspired outfits from Telugu movies. Shop looks from Pushpa, Baahubali, RRR, Arjun Reddy, and more.

## What It Does

- Browse character-inspired fashion collections from Tollywood movies
- Use AI Style Matcher to find outfits matching your preferences
- Shop through affiliate links to Amazon, Flipkart, and other retailers
- Explore character spotlights and movie-inspired styles

## Quick Start

```bash
# Clone and install
git clone https://github.com/wizard-prog/v0-tollywood-fashion-website.git
cd v0-tollywood-fashion-website
npm install

# Run dev server
npm run dev

# Open browser to http://localhost:3000
```

## Tech Stack

- Next.js 14 + React 18 + TypeScript
- Tailwind CSS + Framer Motion (animations)
- Vercel AI SDK (style recommendations)
- React Context API (cart state)
- Vercel hosting

## Project Structure

```
app/                    # Pages (home, collections, cart, etc.)
components/            # Reusable UI components
lib/                   # Data, types, and utilities
public/images/        # Product and character images
```

## Features

- Character-organized product collections
- Cinematic dark UI with neon accents and animations
- AI-powered style matching
- Shopping cart with React Context
- Affiliate redirects to partner sites
- Mobile responsive design
- Fast with lazy loading and code splitting

## Key Components

- **Floating Product Cards** - Animated 3D cards with genre-based colors
- **AI Style Matcher** - Analyzes preferences and recommends character matches
- **Cinematic Navbar** - Navigation with logo, cart, and auth
- **Character Spotlights** - Featured character style guides

## Deployment

Live at: https://vercel.com/saiabhinavrentala-1919s-projects/v0-tollywood-fashion-website

Push to main branch for automatic Vercel deployment.

## Environment Setup

Create `.env.local`:
```env
NEXT_PUBLIC_APP_NAME=Tollywood Threads
```

## Troubleshooting

**Port in use**: `npm run dev -- -p 3001`

**Images not loading**: Verify files exist in `/public/images/` and paths match in data

**Animations stuttering**: Enable hardware acceleration in browser

## License

MIT

---

Built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion. Hosted on Vercel.
