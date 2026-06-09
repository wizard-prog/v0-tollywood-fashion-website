"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"

interface PageTransitionsProps {
  children: React.ReactNode
}

export default function PageTransitions({ children }: PageTransitionsProps) {
  const pathname = usePathname()
  const [isFirstMount, setIsFirstMount] = useState(true)
  const [transitionType, setTransitionType] = useState<"fade" | "slide" | "zoom" | "wipe">("fade")

  useEffect(() => {
    // Only run transitions after first mount
    if (isFirstMount) {
      setIsFirstMount(false)
      return
    }

    // Determine transition type based on path
    if (pathname.includes("collections")) {
      setTransitionType("slide")
    } else if (pathname.includes("characters")) {
      setTransitionType("zoom")
    } else if (pathname.includes("about") || pathname.includes("contact")) {
      setTransitionType("wipe")
    } else {
      setTransitionType("fade")
    }
  }, [pathname, isFirstMount])

  // Skip animation on first mount
  if (isFirstMount) {
    return <>{children}</>
  }

  // Transition variants
  const variants = {
    fade: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.5 },
    },
    slide: {
      initial: { x: "100%", opacity: 0 },
      animate: { x: 0, opacity: 1 },
      exit: { x: "-100%", opacity: 0 },
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    zoom: {
      initial: { scale: 0.9, opacity: 0 },
      animate: { scale: 1, opacity: 1 },
      exit: { scale: 1.1, opacity: 0 },
      transition: { duration: 0.5 },
    },
    wipe: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.5 },
    },
  }

  // Film-inspired overlay for wipe transition
  const overlayVariants = {
    initial: { scaleX: 0, originX: 0 },
    animate: { scaleX: 1, originX: 0 },
    exit: { scaleX: 0, originX: 1 },
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={variants[transitionType].initial}
        animate={variants[transitionType].animate}
        exit={variants[transitionType].exit}
        transition={variants[transitionType].transition}
      >
        {transitionType === "wipe" && (
          <motion.div
            className="fixed inset-0 bg-navy-700 z-50"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={overlayVariants}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        )}
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
