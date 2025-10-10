"use client"

import { Diamond } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

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
    <main className="min-h-screen bg-[#1a1a2e] flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-md w-full flex flex-col items-center text-center space-y-8">
        {/* Logo */}
        <div className="relative">
          <div className="w-20 h-20 bg-lime-400 rounded-2xl flex items-center justify-center transform rotate-45">
            <Diamond className="w-10 h-10 text-[#1a1a2e] transform -rotate-45" />
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-3">
          <h1 className="text-2xl font-bold text-white">
            안녕하세요.
            <br />
            건설기업입니다.
          </h1>
          <p className="text-gray-400 text-sm">홈화면에서 더욱 편리하게 이용 가능합니다.</p>
        </div>

        {/* Spacer */}
        <div className="flex-1 min-h-[120px]" />

        {/* Action Buttons */}
        <div className="w-full space-y-3">
          <button
            onClick={handleOpenSampleBook}
            className="w-full bg-lime-400 hover:bg-lime-500 text-[#1a1a2e] font-semibold py-4 rounded-full transition-colors"
          >
            모바일 샘플북 열기
          </button>

          <button
            onClick={handleAddToHomeScreen}
            className="w-full bg-transparent hover:bg-white/10 text-white font-semibold py-4 rounded-full border-2 border-white/30 transition-colors"
          >
            홈화면에 바로가기
          </button>
        </div>
      </div>
    </main>
  )
}
