"use client"
import type { ReactNode } from "react"

interface CinematicBackgroundProps {
  children: ReactNode
  posterUrl: string
  overlayColor?: string
}

export default function CinematicBackground({
  children,
  posterUrl,
  overlayColor = "rgba(0, 0, 0, 0.7)",
}: CinematicBackgroundProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        backgroundImage: `url(${posterUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* Blurred overlay */}
      <div className="absolute inset-0 backdrop-blur-sm" style={{ backgroundColor: overlayColor }}></div>

      {/* Vignette effect */}
      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)",
          pointerEvents: "none",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}
