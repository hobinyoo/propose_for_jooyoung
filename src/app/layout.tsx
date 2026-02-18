import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: '프로포즈 선물 퀴즈 - 주영의 선택',
  description: '특별한 프로포즈 선물을 받기 위한 퀴즈입니다.',
  keywords: ['프로포즈', '선물', '퀴즈', '주영', '효원'],
  authors: [{ name: '효원' }],
  creator: '효원',
  publisher: '효원',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: '프로포즈 선물 퀴즈 - 주영의 선택',
    description: '특별한 프로포즈 선물을 받기 위한 퀴즈입니다.',
    url: 'https://propose-pink.vercel.app',
    siteName: '프로포즈 선물 퀴즈',
    images: [
      {
        url: 'https://mono-color.com/web/product/big/201712/12_shop1_921494.jpg',
        width: 960,
        height: 832,
        alt: '프로포즈 선물',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}
