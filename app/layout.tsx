import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

import { Inter } from 'next/font/google'

// Initialize fonts - Inter is highly readable and professional for clinical UIs
const inter = Inter({
  subsets: ['latin'],
  weight: ["400","500","600","700"],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: "CareFlow - Electronic Health Records",
  description: "Modern healthcare management platform for streamlined patient care",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
