'use client'

import Link from 'next/link'
import { useLang, type L } from '@/lib/i18n'

export function PageIntro({ eyebrow, title, lead, backHref = '/', backLabel }: { eyebrow: string; title: L; lead?: L; backHref?: string; backLabel?: L }) {
  const { t } = useLang()
  return (
    <header className="page-intro">
      <div className="wrap">
        <Link href={backHref} className="btn btn-ghost btn-sm back-link">
          ← {t(backLabel ?? { zh: '返回首页', en: 'Home' })}
        </Link>
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="section-title glow-text" style={{ fontSize: 'clamp(34px, 6vw, 56px)' }}>{t(title)}</h1>
        {lead && <p className="lead">{t(lead)}</p>}
      </div>
    </header>
  )
}
