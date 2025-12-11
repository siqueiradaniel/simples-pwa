import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import BottomNavigationBar from '@/components/home/BottomNavigationBar'
import CartInitializer from '@/components/CartInitializer' 
import { Toaster } from 'sonner';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ideal - Sistema de compras online',
  description: 'Realize suas compras sem sair de casa',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* PWA tags */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/idealLogo.png" /> 
        <link rel="apple-touch-icon" href="/idealLogo.png" />        
        <meta name="theme-color" content="#000000" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="ClickBeard" />
      </head>
      <body className={`${inter.className} bg-gray-50`}>
        <CartInitializer />
        <main className="pb-20 min-h-screen">
          {children}
        </main>
        <BottomNavigationBar />
        <Toaster richColors closeButton />
      </body>
    </html>
  )
}