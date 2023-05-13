import './globals.css'
import { Inter } from 'next/font/google'
import React from "react";
import AppRoot from "@/components/app-root";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'bitBites',
  description: 'Share info about interesting tech news and innovations around the world!',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
      <html lang="en">
        <body className={inter.className}>
          <AppRoot>{children}</AppRoot>
        </body>
      </html>
  )
}
