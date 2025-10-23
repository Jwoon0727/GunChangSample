import Image from "next/image"

export default function InstallPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-6 py-12" style={{ touchAction: 'pan-x pan-y', userSelect: 'none' }}>
      <div className="max-w-md w-full flex flex-col items-center space-y-8">
         {/* App Icon */}
         <div className="relative mt-28">
 
      <Image
        src="/icons/homeadd.png"
        alt="앱 아이콘"
        width={270}
        height={80}
        className="object-contain rounded-2xl cursor-pointer"
        priority
      />
  
  </div>

  <div className="relative mt-18">
    <Image
      src="/icons/infofo.png"
      alt="앱 아이콘"
      width={480}
      height={190}
      className="object-contain w-full"
      priority
    />
  </div>

       
      </div>
    </main>
  )
}
