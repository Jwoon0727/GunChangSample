"use client"

import { Leaf, TrendingUp, Shield, Layers, Grid3x3, Infinity } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import Image from "next/image";

export default function Home() {
  const router = useRouter()
  const pathname = usePathname()
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // 첫 방문자 체크 로직 제거 - welcome 페이지에서 직접 이동 가능하도록 함

  // 이미지 프리로딩
  useEffect(() => {
    const imageUrls = [
      "/icons/main1-1.svg",
      "/icons/main1-1-active.svg",
      "/icons/main2-2.svg",
      "/icons/main2-2-active.svg",
      "/icons/main3-3.svg",
      "/icons/main3-3-active.svg"
    ]

    // 이미지들을 미리 로드하지만 상태 변경은 하지 않음
    imageUrls.forEach((url) => {
      const img = new window.Image() as HTMLImageElement
      img.src = url
    })

    // 즉시 로드 완료 상태로 설정
    setImagesLoaded(true)
  }, [])

  return (
    <main className="min-h-screen bg-white pb-25" style={{ touchAction: 'pan-x pan-y', userSelect: 'none' }}>
      {/* Header Section */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto text-left">
          <div className="flex items-baseline gap-0.5 -mb-1">
            <h1 
              className="text-gray-800"
              style={{ 
                fontFamily: 'var(--font-dm-serif-text)',
                fontSize: '32px',
                fontWeight: '400'
              }}
            >
              MFB
            </h1>
            <p 
              className="text-gray-800"
              style={{ 
                fontFamily: 'var(--font-dm-serif-text)',
                fontSize: '16px',
                fontWeight: '400'
              }}
            >
              (Melamin Faced Board)
            </p>
          </div>
          <p 
            className="text-gray-800 mb-12"
            style={{ 
              fontFamily: 'var(--font-dm-serif-text)',
              fontSize: '19px',
              fontWeight: '400'
            }}
          >
            MAKING PROCESS
          </p>

          {/* Process Steps */}
          <div className="space-y-12 md:space-y-16">
            {/* Step 1 */}
            <div className="flex flex-row items-start gap-6 mb-0">
            <div className="flex-shrink-0 w-full max-w-[150px] md:w-60">
            <div className=" rounded-lg p-2 md:p-6 aspect-square flex items-center justify-center">
                  <img
                    src="/icons/group4.png"
                    alt="Step 1 illustration"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="flex-1 text-left mt-7">
                <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3" style={{ fontFamily: 'var(--font-pragati-narrow)' }}>STEP 1</h2>
                <p className="text-base text-gray-700 leading-relaxed">데코페이퍼를 멜라민수지에 <br/>함침 → LPM 시트 제작</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-row items-start gap-6 mb-0">
            <div className="flex-shrink-0 w-full max-w-[150px] md:w-48">
            <div className=" rounded-lg p-2 md:p-6 aspect-square flex items-center justify-center">
                  <img
                    src="/icons/group3.png"
                    alt="Step 2 illustration"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div className="flex-1 text-left mt-8">
                <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3" style={{ fontFamily: 'var(--font-pragati-narrow)' }}>STEP 2</h2>
                <p className="text-base text-gray-700 leading-relaxed">열과 압력으로 LPM 시트를 <br/>
                보드에 접착 → MFB 생산</p>
              </div>
            </div>

            {/* Product Cards */}
            <div className="flex gap-3 md:gap-6">
              {/* Product 1 */}
              <div className="flex-1 rounded-lg p-6 flex flex-col items-center text-center">
                <div className="w-[130px] h-[90px] md:w-[200px] md:h-[150px] bg-lime-400 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src="/icons/group1.png"
                    alt="3D MFB Eco-friendly"
                    className="w-full h-full object-cover"
                  />
                </div>
        
                <p className="text-base md:text-base text-gray-700 leading-relaxed">
                일반 프레스 압착 
                <br/>→ 매끈한 표면
                </p>
              </div>

              {/* Product 2 */}
              <div className="flex-1 rounded-lg p-6 flex flex-col items-center text-center">
                <div className="w-[130px] h-[90px] md:w-[220px] md:h-[150px] bg-lime-400 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  <img
                    src="/icons/group2.png"
                    alt="3D MFB Premium"
                    className="w-full h-full object-cover"
                  />
                </div>
         
                <p className="text-base md:text-base text-gray-700 leading-relaxed">
                경면 프레스 압착 
                <br/>→ 질감 있는 표면
                </p>
              </div>
            </div>
          </div>
<br/>
          <div className="container mx-auto px-2">
          <div className="container mx-auto pl-0 pr-2 py-4 md:py-6">
         <div className="max-w-4xl mx-auto">
           <div className="flex items-baseline gap-0.5 -mb-1">
             <h1 
               className="text-gray-800"
               style={{ 
                 fontFamily: 'var(--font-dm-serif-text)',
                 fontSize: '32px',
                 fontWeight: '400'
               }}
             >
               MFB
             </h1>
             
             <p 
               className="text-gray-800"
               style={{ 
                 fontFamily: 'var(--font-dm-serif-text)',
                 fontSize: '16px',
                 fontWeight: '400'
               }}
             >
               (Melamin Faced Board)
             </p>
           </div>
         
           <p 
             className="text-gray-800 mb--10"
             style={{ 
               fontFamily: 'var(--font-dm-serif-text)',
               fontSize: '19px',
               fontWeight: '400'
             }}
           >
             ADVANTAGES
           </p>
    </div>
  </div>
</div>
       {/* Features Section */}
<div className="  border-gray-200">
  <div className="flex flex-col items-center text-center">
    {/* Single Image */}
    <div className="w-94 h-44 md:w-152 md:h-82 rounded-full flex items-center justify-center mb-0">
  <img
    src="/icons/group7.png"
    alt="Features illustration"
    className="w-full h-full object-contain"
  />
</div>

{/* Feature Texts */}
<div className="flex justify-center gap-0 -md:gap-2 px-2">
  <div className="flex flex-col items-center text-center w-[118px]">
  <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3" style={{ fontFamily: 'var(--font-pragati-narrow)' }}>Eco-Friendly</h2>
    <div className="space-y-1">
      <p className="text-base md:text-sm text-gray-600 leading-tight">접착제 없이</p>
      <p className="text-base md:text-sm text-gray-600 leading-tight">제작한</p>
      <p className="text-base md:text-sm text-gray-600 leading-tight">친환경성</p>
    </div>
  </div>

  <div className="flex flex-col items-center text-center w-[118px]">
  <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3" style={{ fontFamily: 'var(--font-pragati-narrow)' }}>Expressiveness</h2>
    <div className="space-y-1">
      <p className="text-base md:text-sm text-gray-600 leading-tight">다양한 무늬와</p>
      <p className="text-base md:text-sm text-gray-600 leading-tight">질감을 구현하는</p>
      <p className="text-base md:text-sm text-gray-600 leading-tight">표현력</p>
    </div>
  </div>

  <div className="flex flex-col items-center text-center w-[118px]">
  <h2 className="text-xl md:text-2xl font-bold mb-2 md:mb-3" style={{ fontFamily: 'var(--font-pragati-narrow)' }}>Durability</h2>
    <div className="space-y-1">
      <p className="text-base md:text-sm text-gray-600 leading-tight">스크래치·오염·</p>
      <p className="text-base md:text-sm text-gray-600 leading-tight">습기에 강한</p>
      <p className="text-base md:text-sm text-gray-600 leading-tight">내구성</p>
    </div>
  </div>
</div>

          <div></div>

            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-3 z-50">
  <div className="flex justify-center">
    <div className="inline-flex items-center gap-3 md:gap-4 rounded-full px-2 py-1">
      <Link href="/materials" className="flex flex-col items-center gap-1 group">
        <Image
          src={pathname === "/materials" ? "/icons/main1-1-active.svg" : "/icons/main1-1.svg"}
          alt="MFB소개"
          width={250}
          height={250}
          className="transition-all duration-300 ease-in-out md:scale-100"
          priority
        />
        <span
          className={`text-xs md:text-sm font-medium transition-colors duration-300 ${
            pathname === "/materials" ? "text-lime-600" : "text-gray-600"
          }`}
        />
      </Link>

      <Link href="/welcome" className="flex flex-col items-center gap-1 group">
        <Image
          src={pathname === "/welcome" ? "/icons/main2-2-active.svg" : "/icons/main2-2.svg"}
          alt="3D MFB"
          width={250}
          height={250}
          className="transition-all duration-300 ease-in-out md:scale-100"
          priority
        />
        <span
          className={`text-xs md:text-sm font-medium transition-colors duration-300 ${
            pathname === "/welcome" ? "text-lime-600" : "text-gray-600"
          }`}
        />
      </Link>

      <Link href="/quote" className="flex flex-col items-center gap-1 group">
        <Image
          src={pathname === "/quote" ? "/icons/main3-3-active.svg" : "/icons/main3-3.svg"}
          alt="건창기업"
          width={250}
          height={250}
          className="transition-all duration-300 ease-in-out md:scale-100"
          priority
        />
        <span
          className={`text-xs md:text-sm font-medium transition-colors duration-300 ${
            pathname === "/quote" ? "text-lime-600" : "text-gray-600"
          }`}
        />
      </Link>
    </div>
  </div>
</div>
    </main>
  )
}
