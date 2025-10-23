
"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function WelcomePage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // 페이지 로드 시 방문 기록 확인
    checkVisitHistory()
  }, [])

  const checkVisitHistory = () => {
    // localStorage와 쿠키 모두 확인
    const hasVisitedBefore = 
      localStorage.getItem('mfb_visited') === 'true' || 
      document.cookie.includes('mfb_visited=true')
    
    setIsLoading(false)
  }

  const markAsVisited = () => {
    // localStorage에 방문 기록 저장
    localStorage.setItem('mfb_visited', 'true')
    
    // 쿠키에도 방문 기록 저장 (30일 유효)
    const expires = new Date()
    expires.setTime(expires.getTime() + (30 * 24 * 60 * 60 * 1000))
    document.cookie = `mfb_visited=true; expires=${expires.toUTCString()}; path=/`
  }

  const handleOpenSampleBook = () => {
    // 방문 기록 확인
    const hasVisitedBefore = 
      localStorage.getItem('mfb_visited') === 'true' || 
      document.cookie.includes('mfb_visited=true')
    
    if (hasVisitedBefore) {
      // 이전에 방문한 적이 있으면 welcome 페이지로
      router.push("/welcome")
    } else {
      // 처음 방문이면 install 페이지로 이동하고 방문 기록 저장
      markAsVisited()
      router.push("/install")
    }
  }

  const handleAddToHomeScreen = () => {
    // Open external website
    window.open("https://gunchang.com/", "_blank")
  }



  return (
    <main className="min-h-screen bg-[#0E132C] flex flex-col items-stretch justify-start px-0 py-12" style={{ touchAction: 'pan-x pan-y', userSelect: 'none' }}>
    <div className="w-full flex flex-col items-start space-y-14 flex-1">
      {/* Logo */}
      <div className="relative flex items-start justify-start mt-27 pl-9 md:pl-9">
        <Image
          src="/icons/welcome.png"
          alt="MFB"
          width={255}
          height={60}
          className="object-contain"
          priority
        />
      </div>
  
      {/* Action Buttons */}
      <div className="w-full px-4 mt-auto pb-[env(safe-area-inset-bottom)] flex flex-col items-center space-y-4">
        <button
          onClick={handleOpenSampleBook}
          className="bg-[#C5D700] hover:bg-[#B0C100] text-[#1a1a2e] font-semibold rounded-full transition-colors text-lg md:text-xl w-full max-w-[318px] h-[50px]"
        >
          모바일 샘플북 열기
        </button>
  
        <button
          onClick={handleAddToHomeScreen}
          className="bg-transparent hover:bg-white/10 text-[#B0C100] font-semibold rounded-full border-2 border-[#B0C100] transition-colors text-lg md:text-xl w-full max-w-[318px] h-[50px]"
        >
          홈페이지 방문하기
        </button>
      </div>
    </div>
  </main>
  )
}
