"use client"

import { Diamond } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Image from "next/image"

export default function WelcomePage() {
  const router = useRouter()

  useEffect(() => {
    // Check if user has already visited
    const hasVisited = localStorage.getItem("hasVisitedBefore")
    if (hasVisited) {
      // Redirect to home if already visited
      router.replace("/")
    }
  }, [router])

  const handleOpenSampleBook = () => {
    // Mark as visited
    localStorage.setItem("hasVisitedBefore", "true")
    // Navigate to installation instructions
    router.push("/install")
  }

  const handleAddToHomeScreen = () => {
    // Mark as visited
    localStorage.setItem("hasVisitedBefore", "true")
    // Navigate to installation instructions
    router.push("/install")
  }

  return (
    <main className="h-screen bg-[#0E132C] flex flex-col items-stretch justify-start px-0 py-12">
      <div className=" w-full flex flex-col items-start space-y-8 h-screen">
            {/* Logo */}
            <div className="relative flex items-start justify-start mt-27">
          <Image
            src="/icons/welcome.png"
            alt="MFB"
            width={265}
            height={60}
            className="object-contain"
            priority
          />
        </div>
        {/* Action Buttons */}
        <div className="w-full space-y-2 mt-auto pb-3">
        <button
            onClick={handleOpenSampleBook}
            className="w-full bg-[#C5D700] hover:bg-[#B0C100] text-[#1a1a2e] font-semibold py-4 rounded-full transition-colors text-lg md:text-xl"
          >
            모바일 샘플북 열기
          </button>

          <button
            onClick={handleAddToHomeScreen}
            className="w-full bg-transparent hover:bg-white/10 text-[#B0C100] font-semibold py-4 rounded-full border-2 border-[#B0C100] transition-colors text-lg md:text-xl"
          >
            홈페이지 방문하기
          </button>
        </div>
      </div>
    </main>
  )
}
