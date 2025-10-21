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
            width={290}
            height={60}
            className="object-contain mx-auto"
          />
        </div>

        <div className="mb-6 rounded-2xl overflow-hidden shadow-sm">
        <div className="relative w-full aspect-[16/10]">
    <iframe
      src="https://www.google.com/maps?q=37.58642,126.61893&z=16&hl=ko&output=embed"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      className="absolute inset-0 w-full h-full grayscale"
    />

    
            <div className="absolute bottom-4 left-4 bg-lime-500 rounded-full p-3 shadow-lg">
              <div className="w-4 h-4 bg-white rounded-full" />
            </div>
          </div>
        </div>

        <div className=" rounded-2xl p-4 mb-8 space-y-1">
        <div className="flex items-start gap-1">
            <span className="text-gray-900 font-semibold min-w-[10px]" style={{ fontFamily: 'Pretendard', fontSize: '16px', lineHeight: '22px', letterSpacing: '-0.03em' }}>A</span>
            <div>
              <p className="text-gray-700" style={{ fontFamily: 'Pretendard', fontWeight: '300', fontSize: '16px', lineHeight: '22px', letterSpacing: '-0.03em' }}>인천광역시 서구 도담5로 69 (22667)  건창기업(주)</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-900 font-semibold" style={{ fontFamily: 'Pretendard', fontSize: '16px', lineHeight: '22px', letterSpacing: '-0.03em' }}>T</span>
            <p className="text-gray-700" style={{ fontFamily: 'Pretendard', fontWeight: '300', fontSize: '16px', lineHeight: '22px', letterSpacing: '-0.03em' }}>032-813-8070~3</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-900 font-semibold" style={{ fontFamily: 'Pretendard', fontSize: '16px', lineHeight: '22px', letterSpacing: '-0.03em' }}>F</span>
            <p className="text-gray-700" style={{ fontFamily: 'Pretendard', fontWeight: '300', fontSize: '16px', lineHeight: '22px', letterSpacing: '-0.03em' }}> 032-813-8074</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-gray-900 font-semibold" style={{ fontFamily: 'Pretendard', fontSize: '16px', lineHeight: '22px', letterSpacing: '-0.03em' }}>E</span>
            <p className="text-gray-700" style={{ fontFamily: 'Pretendard', fontWeight: '300', fontSize: '16px', lineHeight: '22px', letterSpacing: '-0.03em' }}>gc01@gunchang.com</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 mb-8">
        <a
  href="tel:032-813-8070"
  className="w-[166px] h-[46px] flex items-center justify-center gap-2 rounded-full transition-colors shadow-sm"
  style={{ backgroundColor: "#C5D700" }}
>
          <Image src="/icons/tell.png" alt="전화하기" width={100} height={46} className="w-50 h-6 object-contain" />

        </a>
        <button
        onClick={() =>
          window.open(
            "https://map.naver.com/v5/search/" + encodeURIComponent("인천광역시 서구 도담5로 69"),
            "_blank"
          )
        }
        className=" w-[166px] h-[46px] flex items-center justify-center gap-2 text-white font-medium py-4 rounded-full transition-colors shadow-sm"
        style={{ backgroundColor: "#C5D700" }}
      >
        <Image src="/icons/nav.png" alt="안내시작" width={100} height={46} className="w-50 h-6 object-contain" />
      </button>
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

      <Link href="/" className="flex flex-col items-center gap-1 group">
        <Image
          src={pathname === "/" ? "/icons/main2-2-active.svg" : "/icons/main2-2.svg"}
          alt="3D MFB"
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
