import * as React from "react"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    value?: number
    max?: number
    getFillColor?: (value: number) => string
  }
>(({ className, value = 0, max = 100, getFillColor, ...props }, ref) => {
  const percentage = (value / max) * 100

  // Default fill color is coral-500
  const fillColor = getFillColor ? getFillColor(percentage) : "bg-coral-500"

  return (
    <div ref={ref} className={cn("relative h-4 w-full overflow-hidden rounded-full bg-gray-200", className)} {...props}>
      <div
        className={cn("h-full w-full flex-1 transition-all", fillColor)}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  )
})
Progress.displayName = "Progress"

export { Progress }
