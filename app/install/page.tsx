import { Diamond, Chrome, Menu, Share } from "lucide-react"
import Link from "next/link"

export default function InstallPage() {
  return (
    <main className="min-h-screen bg-white flex flex-col items-center px-6 py-12">
      <div className="max-w-md w-full flex flex-col items-center space-y-8">
        {/* App Icon */}
        <div className="relative mt-8">
          <div className="w-20 h-20 bg-lime-400 rounded-2xl flex items-center justify-center transform rotate-45 shadow-lg">
            <Diamond className="w-10 h-10 text-[#1a1a2e] transform -rotate-45" />
          </div>
        </div>

        {/* Instruction Text */}
        <div className="text-center space-y-2">
          <h1 className="text-xl font-bold text-gray-900">자장기업 샘플북 앱을</h1>
          <p className="text-xl font-bold text-gray-900">
            <span className="text-lime-600">"홈 화면에 추가"</span>하세요!!
          </p>
        </div>

        {/* Browser Instructions */}
        <div className="w-full space-y-6 mt-8">
          {/* Chrome */}
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <Chrome className="w-6 h-6 text-red-500" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Chrome</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Menu className="w-4 h-4" />
                <span>→</span>
                <span className="font-medium">홈 화면에 추가</span>
              </div>
            </div>
          </div>

          {/* Samsung Internet */}
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <div className="w-6 h-6 bg-purple-500 rounded-full" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">삼성인터넷</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Menu className="w-4 h-4" />
                <span>→</span>
                <span className="font-medium">페이지 추가</span>
                <span>→</span>
                <span className="font-medium">홈 화면</span>
              </div>
            </div>
          </div>

          {/* Safari */}
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white rounded-sm" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-1">Safari</h3>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Share className="w-4 h-4" />
                <span>→</span>
                <span className="font-medium">홈 화면에 추가</span>
              </div>
            </div>
          </div>
        </div>

        {/* Continue Button */}
        <div className="w-full mt-8">
          <Link
            href="/"
            className="block w-full bg-lime-400 hover:bg-lime-500 text-[#1a1a2e] font-semibold py-4 rounded-full text-center transition-colors"
          >
            계속하기
          </Link>
        </div>
      </div>
    </main>
  )
}
