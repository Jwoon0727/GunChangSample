"use client"

import { Home, Layers, Grid3x3, Infinity, Phone, MessageCircle, Leaf } from "lucide-react"
import Link from "next/link"
import Image from "next/image";
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function QuotePage() {
  const pathname = usePathname()
  const [imagesLoaded, setImagesLoaded] = useState(false)

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
    <main className="min-h-screen bg-white pb-10">
      <div className="container mx-auto px-4 py-6 md:py-8 max-w-md">
        <div className="flex items-center justify-center mb-8 mt-8">
          <Image
            src="/icons/qgunchang.png"
            alt="OUNGHANG"
            width={120}
            height={30}
            className="object-contain"
          />
        </div>

        <div className="text-center mb-8">
          <Image
            src="/icons/text.png"
            alt="손끝에 느껴지는 감각, 공간 디자인을 완성하다."
            width={270}
            height={80}
            className="object-contain mx-auto"
          />
        </div>

        <div className="mb-6 rounded-2xl overflow-hidden shadow-sm">
          <div className="relative w-full h-64 bg-gray-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3236.8!2d126.95!3d35.94!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzXCsDU2JzI2LjQiTiAxMjbCsDU3JzAwLjAiRQ!5e0!3m2!1sko!2skr!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale"
            />
            <div className="absolute bottom-4 left-4 bg-lime-500 rounded-full p-3 shadow-lg">
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
          </div>
        </div>

        <div className=" rounded-2xl p-6 mb-6 space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-gray-900 font-medium min-w-[20px]">A</span>
            <div>
              <p className="text-sm text-gray-700">전라북도 익산시 모현동1가 669 (2층F), 익산(이리)역</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-900 font-medium">T</span>
            <p className="text-sm text-gray-700">063-813-8074</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-900 font-medium">F</span>
            <p className="text-sm text-gray-700">010-8075-3</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-900 font-medium">@</span>
            <p className="text-sm text-gray-700">ok@ounghang.com</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
          <a
            href="tel:063-813-8074"
            className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-4 rounded-full transition-colors shadow-sm"
          >
            <Phone className="w-5 h-5" />
            <span>전화하기</span>
          </a>
          <button className="flex items-center justify-center gap-2 bg-lime-500 hover:bg-lime-600 text-white font-medium py-4 rounded-full transition-colors shadow-sm">
            <MessageCircle className="w-5 h-5" />
            <span>채팅하기</span>
          </button>
        </div>
      </div>
      <div className="fixed bottom-3 left-0 right-0 bg-white border-t border-gray-200 py-2 z-50">
  <div className="flex justify-center">
    <div className="inline-flex items-center gap-3 md:gap-4 rounded-full px-2 py-1">
      <Link href="/" className="flex flex-col items-center gap-1 group">
        <Image
          src={pathname === "/" ? "/icons/main1-1-active.svg" : "/icons/main1-1.svg"}
          alt="MFB소개"
          width={250}
          height={250}
          className="transition-all duration-300 ease-in-out md:scale-100"
          priority
        />
        <span
          className={`text-xs md:text-sm font-medium transition-colors duration-300 ${
            pathname === "/" ? "text-lime-600" : "text-gray-600"
          }`}
        />
      </Link>

      <Link href="/materials" className="flex flex-col items-center gap-1 group">
        <Image
          src={pathname === "/materials" ? "/icons/main2-2-active.svg" : "/icons/main2-2.svg"}
          alt="3D MFB"
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
