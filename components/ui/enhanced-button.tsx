"use client"

import React, { useState, useRef, type ReactNode } from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react"

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        primary: "bg-coral-500 text-white hover:bg-coral-600 active:bg-coral-700",
        secondary: "bg-navy-700 text-white hover:bg-navy-800 active:bg-navy-900",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-12 px-8 rounded-md text-base",
        icon: "h-10 w-10 rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  icon?: ReactNode
  iconPosition?: "left" | "right"
  loading?: boolean
  rippleEffect?: boolean
  glowEffect?: boolean
}

const EnhancedButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      icon,
      iconPosition = "left",
      loading = false,
      rippleEffect = false,
      glowEffect = false,
      children,
      ...props
    },
    ref,
  ) => {
    const [ripples, setRipples] = useState<{ x: number; y: number; size: number; id: number }[]>([])
    const buttonRef = useRef<HTMLButtonElement>(null)
    const rippleCount = useRef(0)

    const handleRipple = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!rippleEffect || !buttonRef.current) return

      const button = buttonRef.current
      const rect = button.getBoundingClientRect()
      const size = Math.max(rect.width, rect.height)
      const x = e.clientX - rect.left - size / 2
      const y = e.clientY - rect.top - size / 2

      const newRipple = {
        x,
        y,
        size,
        id: rippleCount.current,
      }

      rippleCount.current += 1
      setRipples((prevRipples) => [...prevRipples, newRipple])

      setTimeout(() => {
        setRipples((prevRipples) => prevRipples.filter((ripple) => ripple.id !== newRipple.id))
      }, 600)
    }

    const glowClass = glowEffect
      ? variant === "primary"
        ? "shadow-[0_0_15px_rgba(255,107,107,0.5)] hover:shadow-[0_0_25px_rgba(255,107,107,0.6)]"
        : variant === "secondary"
          ? "shadow-[0_0_15px_rgba(30,58,138,0.5)] hover:shadow-[0_0_25px_rgba(30,58,138,0.6)]"
          : ""
      : ""

    return (
      <button
        ref={(node) => {
          // Merge refs
          if (typeof ref === "function") {
            ref(node)
          } else if (ref) {
            ref.current = node
          }
          buttonRef.current = node
        }}
        className={cn(
          buttonVariants({ variant, size, className }),
          "relative overflow-hidden transition-all duration-300",
          glowClass,
          loading ? "opacity-80" : "",
          rippleEffect ? "transform active:scale-95" : "",
        )}
        onClick={handleRipple}
        disabled={loading || props.disabled}
        {...props}
      >
        {/* Ripple effect */}
        {rippleEffect &&
          ripples.map((ripple) => (
            <span
              key={ripple.id}
              className="absolute rounded-full bg-white/30 animate-ripple"
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          ))}

        {/* Button content */}
        <span className="relative z-10 flex items-center justify-center gap-2">
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              {icon && iconPosition === "left" && !loading && <span className="mr-1">{icon}</span>}
              {children}
              {icon && iconPosition === "right" && !loading && <span className="ml-1">{icon}</span>}
            </>
          )}
        </span>
      </button>
    )
  },
)

EnhancedButton.displayName = "EnhancedButton"

export default EnhancedButton
