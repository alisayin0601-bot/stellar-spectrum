'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLang } from '@/lib/i18n'
import { TOPICS } from '@/lib/data'
import { Emoji } from './emoji'

export function SiteHeader() {
  const pathname = usePathname()
  const { lang, setLang, t } = useLang()

  return (
    <header className="site-header">
      <div className="wrap header-row">
        <Link href="/" className="brand" aria-label="星谱 Stellar Spectrum">
          <span className="brand-zh">星谱</span>
          <span className="brand-en">Stellar Spectrum</span>
        </Link>

        <nav className="nav" aria-label={t({ zh: '科普栏目', en: 'Topics' })}>
          {TOPICS.map((topic) => (
            <Link
              key={topic.id}
              href={topic.href}
              className="nav-link"
              aria-current={pathname.startsWith(topic.href) ? 'page' : undefined}
            >
              <Emoji name={topic.emoji} className="emoji" />
              {t(topic.title)}
            </Link>
          ))}
        </nav>

        <div className="lang-toggle" role="group" aria-label="Language">
          <button type="button" aria-pressed={lang === 'zh'} onClick={() => setLang('zh')}>
            中
          </button>
          <button type="button" aria-pressed={lang === 'en'} onClick={() => setLang('en')}>
            EN
          </button>
        </div>
      </div>
    </header>
  )
}
