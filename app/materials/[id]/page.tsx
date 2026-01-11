"use client"

import { useParams, useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { preloadImages, cacheImagesWithServiceWorker, IMAGE_URLS } from "@/lib/image-cache"

const materials = [
  {
    id: 1,
    category: "Wood",
    name: "Wood Louver",
    image: "/icons/1-1LV.jpg",
    initial: "LV",
  },
  {
    id: 2,
    category: "Wood",
    name: "Vertical",
    image: "/icons/1-2VT.jpg",
    initial: "VT",
  },
  {
    id: 3,
    category: "Wood",
    name: "Lined Wood",
    image: "/icons/1-3L.jpg",
    initial: "L",
  },
  {
    id: 4,
    category: "Wood",
    name: "Jamaican Wood",
    image: "/icons/1-4J.jpg",
    initial: "J",
  },
  {
    id: 5,
    category: "Wood",
    name: "Wood Grain",
    image: "/icons/1-5G.jpg",
    initial: "G",
  },
  {
    id: 6,
    category: "Stone",
    name: "Volcano Stone",
    image: "/icons/2-1VS.jpg",
    initial: "VS",
  },
  {
    id: 7,
    category: "Stone",
    name: "Mortar Stone",
    image: "/icons/2-2MT.jpg",
    initial: "MT",
  },
  {
    id: 8,
    category: "Stone",
    name: "Natural Stone",
    image: "/icons/2-3NS.jpg",
    initial: "NS",
  },
  {
    id: 9,
    category: "Stone",
    name: "Stone",
    image: "/icons/2-4S.jpg",
    initial: "S",
  },
  {
    id: 10,
    category: "Leather",
    name: "Calf Skin",
    image: "/icons/3-1CS.jpg",
    initial: "CS",
  },
  {
    id: 11,
    category: "Leather",
    name: "Togo Skin",
    image: "/icons/3-2TS.jpg",
    initial: "TS",
  },
  {
    id: 12,
    category: "Metal",
    name: "Titanium",
    image: "/icons/4-1TI.jpg",
    initial: "TI",
  },
  {
    id: 13,
    category: "Fantasy",
    name: "Fabric",
    image: "/icons/5-1F.jpg",
    initial: "F",
  },
  {
    id: 14,
    category: "Fantasy",
    name: "Soft Embossing",
    image: "/icons/5-2ST.jpg",
    initial: "ST",
  },
  {
    id: 15,
    category: "Fantasy",
    name: "Prime Matt",
    image: "/icons/5-3PM.jpg",
    initial: "PM",
  },
]

// 카테고리별 이니셜 색상 매핑
const categoryInitialColors: Record<string, string> = {
  Wood: '#CFB5A5',
  Stone: '#9F9F9F',
  Leather: '#816558',
  Metal: '#B8C1C8',
  Fantasy: '#7F8E9F',
}

export default function MaterialDetailPage() {
  const params = useParams()
  const router = useRouter()
  const searchParams = useSearchParams()
  const materialId = Number(params.id)
  const [imageLoaded, setImageLoaded] = useState(false)

  const material = materials.find((m) => m.id === materialId)

  // 개선된 이미지 프리로딩 및 캐싱
  useEffect(() => {
    if (!material) return

    const initializeImageCaching = async () => {
      try {
        // 1. 현재 이미지 즉시 로드
        const currentImg = new window.Image() as HTMLImageElement
        currentImg.onload = () => setImageLoaded(true)
        currentImg.onerror = () => setImageLoaded(true) // 에러 시에도 로드 상태로 변경
        currentImg.src = material.image

        // 2. 나머지 이미지들을 백그라운드에서 프리로드
        const remainingImages = IMAGE_URLS.filter(url => url !== material.image)
        
        // Service Worker 캐싱과 일반 프리로딩을 병렬로 실행
        await Promise.allSettled([
          cacheImagesWithServiceWorker(remainingImages),
          preloadImages(remainingImages)
        ])
      } catch (error) {
        console.warn('Image caching failed:', error)
      }
    }

    // 메인 스레드를 블록하지 않도록 지연 실행
    setTimeout(initializeImageCaching, 100)
  }, [material])

  // 뒤로가기 함수 - URL 파라미터 포함
  const handleGoBack = () => {
    const category = searchParams.get('category') || 'Wood'
    const index = searchParams.get('index') || '0'
    router.back() // 또는 router.replace 사용
  }

  if (!material) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Material not found</p>
      </div>
    )
  }

  return (
    <main className="min-h-screen relative" style={{ 
      touchAction: 'manipulation',
      userSelect: 'auto',
      WebkitTouchCallout: 'default',
      WebkitUserSelect: 'auto',
      KhtmlUserSelect: 'auto',
      MozUserSelect: 'auto',
      msUserSelect: 'text' as any,
      WebkitTapHighlightColor: 'rgba(0,0,0,0.1)',
      WebkitUserZoom: 'auto' as any,
      zoom: 'auto'
    } as React.CSSProperties}>
      {/* Full-screen background image with Next.js Image optimization */}
      <div className="absolute inset-0" style={{ touchAction: 'manipulation' }}>
        <Image
          src={material.image}
          alt={material.name}
          fill
          className="object-cover"
          priority
          quality={90}
          onLoad={() => setImageLoaded(true)}
          sizes="100vw"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Back button */}
        <div className="p-4 md:p-6">
          <button
            onClick={handleGoBack}
            className="flex items-center gap-2 text-white/30 hover:text-white/50 hover:bg-white/5 rounded-full p-2 transition-colors font-semibold"
            aria-label="Go back"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
        </div>

        {/* Center content */}
        <div className="flex-1 flex flex-col items-center justify-start text-center px-4 pt-20">
          <h1 
            className="-mb-5" 
            style={{ 
              fontFamily: 'var(--font-dm-serif-text)', 
              fontWeight: '400', 
              fontSize: '65px',
              color: categoryInitialColors[material.category] ?? '#D8BFB0',
              position: 'relative',
              
              
            }}
          >
            {material.initial}
          </h1>

          <p 
            className="drop-shadow-lg font-medium" 
            style={{ 
              fontFamily: 'var(--font-pretendard)', 
              fontWeight: '200', 
              fontSize: '20px',
              color: categoryInitialColors[material.category] ?? '#D8BFB0',
              position: 'relative',
              display: 'inline-block',
              
              
            }}
          >
            {material.name}
          </p>
        </div>
      </div>
    </main>
  )
}
