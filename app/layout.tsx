import type { Metadata, Viewport } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { LangProvider } from '@/lib/i18n'
import { Starfield } from '@/components/starfield'
import { AmbientMusic } from '@/components/ambient-music'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import './globals.css'

const display = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap' })

export const metadata: Metadata = {
  title: '星谱 · Stellar Spectrum',
  description: '星谱 Stellar Spectrum：3D 太阳系、小天体、宇宙的故事与天文问答，中英双语天文科普网站。',
}

export const viewport: Viewport = {
  themeColor: '#0B1020',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={display.variable}>
      <body>
        <LangProvider>
          <Starfield />
          <div className="app">
            <SiteHeader />
            <main>{children}</main>
            <SiteFooter />
          </div>
          <AmbientMusic />
        </LangProvider>
      </body>
    </html>
  )
}
