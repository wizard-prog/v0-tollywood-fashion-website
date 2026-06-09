import Image from "next/image"
import Link from "next/link"

export default function Logo() {
  return (
    <Link href="/" className="relative h-16 w-56 block">
      <div className="relative h-full w-full">
        <Image
          src="/images/logo/tollywood-threads-logo.png"
          alt="Tollywood Threads Logo"
          fill
          className="object-contain"
          priority
        />
      </div>
    </Link>
  )
}
