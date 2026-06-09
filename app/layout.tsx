import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import CinematicNavbar from "@/components/cinematic-navbar"
import Footer from "@/components/footer"
import { CartProvider } from "@/lib/cart-context"
import CartDrawer from "@/components/cart-drawer"
import ChatAssistant from "@/components/chat-assistant"
import PageTransitions from "@/components/page-transitions"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Tollywood Threads | Cinematic Fashion Portal",
  description:
    "Step into your favorite characters' wardrobes. Curated fashion collections inspired by iconic Telugu cinema with AI-powered style matching.",
  keywords: "Telugu cinema, Tollywood fashion, movie-inspired clothing, character fashion, cinematic style, AI fashion",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth dark">
      <body className={`${poppins.variable} font-sans bg-cinema-dark text-white`}>
        <CartProvider>
          <CinematicNavbar />
          <CartDrawer />
          <PageTransitions>{children}</PageTransitions>
          <Footer />
          <ChatAssistant />
        </CartProvider>
      </body>
    </html>
  )
}
