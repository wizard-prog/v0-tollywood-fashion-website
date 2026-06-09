# Tollywood Threads 🎬👕

**Tollywood Threads** is a character-inspired fashion discovery platform that helps Telugu cinema fans recreate the iconic looks of their favorite movie characters. Inspired by blockbuster films such as *Pushpa*, *Baahubali*, *RRR*, and more, the platform curates fashion items that match character aesthetics and redirects users to trusted retail partners for purchase.

Rather than maintaining inventory, Tollywood Threads operates on an affiliate-commerce model, connecting cinema culture with fashion commerce through an immersive shopping experience.

---

## ✨ Features

* **130+ Character-Inspired Products** across 7 Tollywood movie collections
* **AI Style Matcher** powered by Vercel AI SDK for personalized character recommendations
* **Affiliate Shopping Integration** with multiple retail partners
* **Dark Cinematic UI** with smooth animations and immersive visual effects
* **Character-Centric Collections** organized by movies and iconic roles
* **Shopping Cart Functionality** using React Context API
* **Mobile-Responsive Design** optimized for all screen sizes
* **SEO Optimization** with structured metadata
* **Lazy Loading & Performance Enhancements** for faster browsing

---

## 🚀 How It Works

1. Browse collections inspired by popular Telugu movie characters.
2. Explore outfits and accessories curated to match each character's style.
3. Use the **AI Style Matcher** to answer preference-based questions.
4. Receive personalized character recommendations based on your fashion preferences.
5. Click **Buy Now** to purchase matching products through affiliate retailer links.

---

## 🏗️ Architecture

### 1. Client Layer

* React 18 with TypeScript
* Tailwind CSS styling
* Framer Motion animations
* React Context API for cart management
* Responsive UI components

### 2. Server Layer

* Next.js 14 App Router
* Server Components for efficient data fetching
* Server Actions for backend operations
* Vercel AI SDK powering the AI Style Matcher

### 3. Data Layer

* Static TypeScript datasets stored in `lib/data.ts`
* Character collections and product metadata
* Affiliate retailer links
* No database dependency for the MVP stage

---

## 🛠️ Tech Stack

### Frontend

* Next.js 14
* React 18
* TypeScript
* Tailwind CSS
* Framer Motion

### Backend

* Next.js App Router
* Server Actions
* Vercel AI SDK

### Infrastructure

* Vercel Hosting
* GitHub CI/CD Integration
* Vercel Blob Storage for image optimization

### State Management

* React Context API

---

## 📂 Project Structure

```plaintext
app/
├── page routes
├── collections
├── characters
├── cart
└── ai-style-matcher

components/
├── ProductCard
├── CharacterSpotlight
├── Navbar
└── Cart Components

lib/
├── data.ts
├── types.ts
└── cart-context.tsx

public/
└── images/
```

---

## ⚡ Getting Started

### Clone the Repository

```bash
git clone https://github.com/wizard-prog/v0-tollywood-fashion-website.git
cd v0-tollywood-fashion-website
```

### Install Dependencies

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🚢 Deployment

The project is configured for automatic deployment through Vercel.

```bash
git push origin main
```

Every push to the main branch triggers a new production deployment.

---

## 🎯 Key Technical Decisions

### Affiliate-Commerce Model

* No inventory management overhead
* Scalable business model
* Direct integration with established retailers
* Real-time product availability

### Static Data Architecture

* Faster page loads
* Simpler deployment
* Reduced infrastructure costs
* Ideal for MVP validation

### React Context API

* Lightweight state management
* Minimal complexity
* Perfect for cart functionality

### Server Actions

* End-to-end type safety
* Simplified backend communication
* Improved developer experience

### AI-Powered Recommendations

* Personalized character matching
* Enhanced user engagement
* Unique shopping discovery experience

---

## 🌟 Future Enhancements

* Real affiliate API integrations
* User authentication and profiles
* Wishlist functionality
* Advanced AI outfit generation
* Personalized recommendation history
* Community-driven character collections
* Product availability tracking

---

## 📄 License

MIT License

---

**Built to connect Telugu cinema culture with fashion commerce through immersive, character-driven shopping experiences.**
