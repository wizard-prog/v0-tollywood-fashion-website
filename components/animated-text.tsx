"use client"

import { useEffect, useRef } from "react"
import { motion, useInView, useAnimation } from "framer-motion"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
  delay?: number
  type?: "words" | "chars" | "lines"
}

export default function AnimatedText({
  text,
  className = "",
  once = true,
  delay = 0,
  type = "words",
}: AnimatedTextProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const isInView = useInView(ref, { once })

  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [isInView, controls, once])

  // Split text into words, characters, or lines
  const getTextContent = () => {
    if (type === "words") {
      return text.split(" ").map((word, index) => (
        <motion.span
          key={index}
          className="inline-block"
          custom={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: (i) => ({
              opacity: 1,
              y: 0,
              transition: { delay: delay + i * 0.1, duration: 0.5 },
            }),
          }}
        >
          {word}
          {index < text.split(" ").length - 1 ? " " : ""}
        </motion.span>
      ))
    } else if (type === "chars") {
      return text.split("").map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          custom={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: (i) => ({
              opacity: 1,
              y: 0,
              transition: { delay: delay + i * 0.03, duration: 0.3 },
            }),
          }}
        >
          {char}
        </motion.span>
      ))
    } else {
      // Lines
      return text.split("\n").map((line, index) => (
        <motion.div
          key={index}
          custom={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: (i) => ({
              opacity: 1,
              y: 0,
              transition: { delay: delay + i * 0.2, duration: 0.5 },
            }),
          }}
        >
          {line}
        </motion.div>
      ))
    }
  }

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} className={className} aria-label={text} role="heading">
      {getTextContent()}
    </motion.div>
  )
}
