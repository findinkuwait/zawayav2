import type { Metadata } from 'next'
import '../globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Admin — Zawaya International',
    robots: { index: false },
}

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" dir="ltr" className={inter.className}>
            <body className="bg-gray-50 min-h-screen">{children}</body>
        </html>
    )
}
