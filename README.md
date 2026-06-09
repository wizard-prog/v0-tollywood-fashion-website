# Tollywood Threads

Tollywood Threads is a fashion discovery platform that helps Telugu cinema fans find clothing and accessories inspired by iconic movie characters from films like *Pushpa*, *Baahubali*, and *RRR*. The platform curates character-based collections and redirects users to affiliate retailers for purchases.

## Features

* 130+ character-inspired products across 7 movie collections
* AI Style Matcher for personalized character recommendations
* Affiliate shopping integration with multiple retailers
* Shopping cart with React Context API
* Responsive design with optimized performance
* SEO-friendly architecture

## Tech Stack

* **Frontend:** Next.js 14, React 18, TypeScript, Tailwind CSS, Framer Motion
* **Backend:** Next.js App Router, Server Actions, Vercel AI SDK
* **Hosting:** Vercel
* **State Management:** React Context API

## Architecture

* **Client Layer:** React components, Tailwind CSS, Framer Motion, Context API
* **Server Layer:** Next.js App Router, Server Components, Server Actions, AI Style Matcher
* **Data Layer:** Static TypeScript data (`lib/data.ts`) containing products, characters, and affiliate links

## Project Structure

```plaintext
app/          # Pages and routes
components/   # Reusable UI components
lib/          # Data, types, and cart context
public/       # Images and static assets
```

## Getting Started

```bash
git clone https://github.com/wizard-prog/v0-tollywood-fashion-website.git
cd v0-tollywood-fashion-website
npm install
npm run dev
```

Visit (https://v0-tollywood-fashion-website-hlry496bb.vercel.app/)

## Deployment

Push to the main branch for automatic deployment on Vercel.

## License

MIT

Built to connect Telugu cinema culture with fashion commerce through a character-driven shopping experience.


MIT License

---

**Built to connect Telugu cinema culture with fashion commerce through immersive, character-driven shopping experiences.**
