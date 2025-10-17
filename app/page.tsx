


"use client"

import { useState, useEffect, Suspense, useRef } from "react"
import Link from "next/link"
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { loadImagesWithPriority, cleanupImageCache } from "@/lib/image-cache"


const categories = ["Wood", "Stone", "Leather", "Metal", "Fantasy"]

const materials = [
  {
    id: 1,
    category: "Wood",
    name: "LV Wood Texture",
    image: "/icons/1-1_LV.jpg",
    initial: "LV",
  },
  {
    id: 2,
    category: "Wood",
    name: "Vertical",
    image: "/icons/1-2_VT.jpg",
    initial: "VT",
  },
  {
    id: 3,
    category: "Wood",
    name: "Lined Wood",
    image: "/icons/1-3_L.jpg",
    initial: "L",
  },
  {
    id: 4,
    category: "Wood",
    name: "Jamaican Wood",
    image: "/icons/1-4_J.jpg",
    initial: "J",
  },
  {
    id: 5,
    category: "Wood",
    name: "Wood Grain",
    image: "/icons/1-5_G.jpg",
    initial: "G",
  },
  {
    id: 6,
    category: "Stone",
    name: "Volcano Stone",
    image: "/icons/2-1_VS.jpg",
    initial: "VS",
  },
  {
    id: 7,
    category: "Stone",
    name: "Mortar Stone",
    image: "/icons/2-2_MT.jpg",
    initial: "MT",
  },
  {
    id: 8,
    category: "Stone",
    name: "Marble White",
    image: "/icons/2-3_NS.jpg",
    initial: "NS",
  },
  {
    id: 9,
    category: "Stone",
    name: "Stone",
    image: "/icons/2-4_S.jpg",
    initial: "S",
  },
  {
    id: 10,
    category: "Leather",
    name: "Calf Skin",
    image: "/icons/3-1_CS.jpg",
    initial: "CS",
  },
  {
    id: 11,
    category: "Leather",
    name: "Togo Skin",
    image: "/icons/3-2_TS.jpg",
    initial: "TS",
  },
  {
    id: 12,
    category: "Metal",
    name: "Titanium",
    image: "/icons/4_TI.jpg",
    initial: "TI",
  },
  {
    id: 13,
    category: "Fantasy",
    name: "Fabric",
    image: "/icons/5-1_F.jpg",
    initial: "F",
  },
  {
    id: 14,
    category: "Fantasy",
    name: "Soft Embossing",
    image: "/icons/5-2_ST.jpg",
    initial: "ST",
  },
  {
    id: 15,
    category: "Fantasy",
    name: "Prime Matt",
    image: "/icons/5-3_PM.jpg",
    initial: "PM",
  },
]
// MaterialsPageContent() 내부 최상단 근처에 추가
const categoryInitialColors: Record<string, string> = {
  Wood: '#CFB5A5',
  Stone: '#9F9F9F',
  Leather: '#816558',
  Metal: '#B8C1C8',
  Fantasy: '#7F8E9F',
}

function MaterialsPageContent() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState("Wood")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const isScrollingRef = useRef(false)

  // URL 파라미터에서 인덱스 복원
  useEffect(() => {
    const savedIndex = searchParams.get('index')
    const savedCategory = searchParams.get('category')
    
    if (savedIndex) {
      setCurrentIndex(parseInt(savedIndex))
    }
    if (savedCategory) {
      setSelectedCategory(savedCategory)
    }
  }, [searchParams])

  // 개선된 이미지 프리로딩 - 유틸리티 함수 사용
  useEffect(() => {
    const initializeImageCaching = async () => {
      try {
        // 캐시 정리
        await cleanupImageCache()
        
        // 우선순위 기반 이미지 로딩
        await loadImagesWithPriority()
        
        setImagesLoaded(true)
      } catch (error) {
        console.warn('Image caching initialization failed:', error)
        setImagesLoaded(true) // 에러가 발생해도 로드 상태로 변경
      }
    }

    // 메인 스레드를 블록하지 않도록 지연 실행
    setTimeout(initializeImageCaching, 0)
  }, [])

  // 스크롤 위치를 현재 인덱스에 맞춰 조정
  useEffect(() => {
    if (scrollContainerRef.current && !isScrollingRef.current) {
      const container = scrollContainerRef.current
      const cardWidth = 290 + 16
      const targetScroll = currentIndex * cardWidth
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'auto' // smooth 대신 auto로 즉시 이동
      })
    }
  }, [currentIndex])

  const filteredMaterials = materials.filter((m) => m.category === selectedCategory)

  // 스크롤 이벤트 핸들러 - 한 번에 하나의 카드만 스크롤
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isScrollingRef.current) return
    
    const container = e.currentTarget
    const cardWidth = 290 + 16
    const scrollLeft = container.scrollLeft
    const newIndex = Math.round(scrollLeft / cardWidth)
    
    // 인덱스가 변경되었을 때만 업데이트
    if (newIndex !== currentIndex && newIndex >= 0 && newIndex < filteredMaterials.length) {
      isScrollingRef.current = true
      setCurrentIndex(newIndex)
      updateURL(selectedCategory, newIndex)
      
      // 스크롤 완료 후 플래그 리셋
      setTimeout(() => {
        isScrollingRef.current = false
      }, 300)
    }
  }

  // 수동 카드 이동 함수들
  const scrollToCard = (index: number) => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current
      const cardWidth = 290 + 16
      const targetScroll = index * cardWidth
      
      isScrollingRef.current = true
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      })
      
      setTimeout(() => {
        isScrollingRef.current = false
      }, 300)
    }
  }

  // navigation arrow handlers removed along with buttons

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentIndex(0)
    updateURL(category, 0)
  }

  const updateURL = (category: string, index: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('category', category)
    params.set('index', index.toString())
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const handleMaterialClick = (materialId: number) => {
    const materialIndex = filteredMaterials.findIndex(m => m.id === materialId)
    updateURL(selectedCategory, materialIndex)
  }

  return (
    <main className="min-h-screen bg-white pb-15">
      <div className="container mx-auto px-4 py-12 md:py-10">
        {/* Header */}
        <div className="flex items-center justify-between mt--3 mb-6 md:mt-10 md:mb-8">
          <Image
            src="/icons/MFB.png" // 이미지 경로를 입력하세요
            alt="3D MFB"
            width={106}
            height={44}
            className="object-contain"
          />
        </div>

        {/* Category Filter Buttons */}
        <div 
          className="flex gap-2 mb-8 md:mb-16 overflow-x-auto pb-2 scrollbar-hide"
          style={{
            scrollbarWidth: 'none', // Firefox
            msOverflowStyle: 'none', // Internet Explorer
          }}
        >
{categories.map((category) => (
  <button
    key={category}
    onClick={() => handleCategoryChange(category)}
    className={`px-4 py-1 transition-all duration-300 whitespace-nowrap flex-shrink-0 rounded-lg border-2 font-medium text-[19px] tracking-[0.03em] leading-normal ${
      selectedCategory === category
        ? "bg-[#C5D700] text-white border-[#C5D700] shadow-md scale-105"
        : "bg-white text-[#C5D700] border-[#C5D700]"
    }`}
    style={{ fontFamily: 'var(--font-pragati-narrow)' }}
  >
    {category}
  </button>
))}
</div>
        {/* Carousel Container */}
        <div className="relative w-full ml-0 mr-auto mt-8">
          {/* Material Cards - Controlled Horizontal Scroll */}
          <div 
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory scrollbar-hide"
            style={{
              scrollbarWidth: 'none', // Firefox
              msOverflowStyle: 'none', // Internet Explorer
              paddingLeft: '20px', // 더 왼쪽으로
              paddingRight: 'calc(100vw - 350px)', // 다음 카드가 더 많이 보이도록
            }}
          >
            <div className="flex gap-4 justify-start" style={{ width: 'max-content' }}>
              {filteredMaterials.map((material, index) => (
                <div key={material.id} className="flex-shrink-0 snap-start snap-always">
                  <Link 
                    href={`/materials/${material.id}?category=${selectedCategory}&index=${index}`}
                    prefetch={true}
                    scroll={false}
                    onClick={() => handleMaterialClick(material.id)}
                  >
                                      <div className={`bg-white rounded-lg overflow-hidden cursor-pointer w-[290px] transition-all duration-600 ${
                      index === currentIndex 
                        ? 'scale-100 opacity-100' 
                        : index === currentIndex + 1 
                          ? 'scale-95 opacity-80' // 다음 카드
                        : index === currentIndex - 1
                          ? 'scale-95 opacity-80' // 이전 카드도 동일한 효과
                          : 'scale-0 opacity-0'
                    }`} style={{ boxShadow: '10px 12px 24px rgba(0,0,0,0.16)' }}>
                      <div className="aspect-[3/5.5] relative w-full h-full">
                        <Image
                          src={material.image}
                          alt={material.name}
                          width={290}
                          height={400}
                          className="w-full h-full object-cover"
                          priority={index < 3}
                          loading={index < 3 ? "eager" : "lazy"}
                          sizes="(max-width: 768px) 256px, 320px"
                          placeholder="blur"
                          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                        />
                        <div className="absolute bottom-6 left-6">
                          <span 
                            className="leading-none opacity-100" 
                            style={{ 
                              fontFamily: 'var(--font-dm-serif-text)', 
                              fontWeight: '400', 
                              fontSize: '58px', 
                              color: categoryInitialColors[material.category] ?? '#D8BFB0',
                              textShadow: '0 1px 1px rgba(0,0,0,30)',
                            }}
                          >
                            {material.initial}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>



       
        </div>
      </div>

      <div className="fixed bottom-3 left-0 right-0 bg-white border-t border-gray-200 py-2 z-50">
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

export default function MaterialsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MaterialsPageContent />
    </Suspense>
  )
}
