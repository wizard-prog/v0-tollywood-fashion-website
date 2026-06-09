"use client"

import type React from "react"
import { useRouter } from "next/router"
import Image from "next/image"

const CustomLogo = () => {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    router.push("/")
  }

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer transition-opacity hover:opacity-80"
      style={{ transform: "none" }}
    >
      <Image src="/logo.svg" alt="Logo" width={100} height={30} priority />
    </div>
  )
}

export default CustomLogo
