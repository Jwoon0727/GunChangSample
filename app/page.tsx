"use client"

import Image from "next/image"
import { useEffect } from "react"

const DOWNLOAD_URL = "https://trueframe-snapshot-maker.lovable.app/download"

export default function HomePage() {
  useEffect(() => {
    const timer = window.setTimeout(() => {
      window.location.href = DOWNLOAD_URL
    }, 1200)

    return () => window.clearTimeout(timer)
  }, [])

  return (
    <main
      className="min-h-screen bg-[#0E132C] flex items-center justify-center px-6"
      style={{ touchAction: "pan-x pan-y", userSelect: "none" }}
    >
      <div className="relative flex items-center justify-center">
        <Image
          src="/icons/mainload.png"
          alt="MFB"
          width={200}
          height={200}
          className="object-contain"
          priority
        />
      </div>
    </main>
  )
}
