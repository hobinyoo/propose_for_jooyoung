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
  title: '프로포즈 선물 퀴즈 - 선주의 선택',
  description: '특별한 프로포즈 선물을 받기 위한 퀴즈입니다.',
  keywords: ['프로포즈', '선물', '퀴즈', '선주', '호빈'],
  authors: [{ name: '호빈' }],
  creator: '호빈',
  publisher: '호빈',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: '프로포즈 선물 퀴즈 - 선주의 선택',
    description: '특별한 프로포즈 선물을 받기 위한 퀴즈입니다.',
    url: 'https://propose-pink.vercel.app',
    siteName: '프로포즈 선물 퀴즈',
    images: [
      {
        url: 'https://mono-color.com/web/product/big/201712/12_shop1_921494.jpg',
        width: 960,
        height: 832,
        alt: '디올 카로백 - 프로포즈 선물',
      },
    ],
    locale: 'ko_KR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '프로포즈 선물 퀴즈 - 선주의 선택',
    description: '특별한 프로포즈 선물을 받기 위한 퀴즈입니다.',
    images: [
      'https://mono-color.com/web/product/big/201712/12_shop1_921494.jpg',
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon-180x180.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  themeColor: '#ec4899',
  colorScheme: 'light',
  category: 'entertainment',
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
