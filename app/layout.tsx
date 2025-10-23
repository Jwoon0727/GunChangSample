
import type { Metadata } from "next";
import { Inter, Pragati_Narrow, DM_Serif_Text, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const pragatiNarrow = Pragati_Narrow({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-pragati-narrow",
});
const dmSerifText = DM_Serif_Text({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dm-serif-text",
});
const notoSerifKR = Noto_Serif_KR({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-noto-serif-kr",
});

// Pretendard 폰트는 CSS로 로드 (Google Fonts에 없음)
const pretendard = {
  variable: "--font-pretendard",
};

export const metadata: Metadata = {
  title: "건창기업 샘플북",
  description: "안녕하세요. 건창기업입니다.",
  generator: "Next.js",
  manifest: "/manifest.json",
  keywords: ["nextjs", "next14", "pwa", "next-pwa"],
  themeColor: [{ media: "(prefers-color-scheme: dark)", color: "#fff" }],
  authors: [
    {
      name: "imvinojanv",
      url: "https://www.linkedin.com/in/imvinojanv/",
    },
  ],
  viewport:
    "minimum-scale=1, maximum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover, user-scalable=no",
  icons: [
    { rel: "apple-touch-icon", url: "icons/mainicon.png" },
    { rel: "icon", url: "icons/icon0.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${pragatiNarrow.variable} ${dmSerifText.variable} ${notoSerifKR.variable} ${pretendard.variable}`}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}