'use client'

import Link from 'next/link'
import { useLang } from '@/lib/i18n'
import type { Body } from '@/lib/data'
import { Emoji } from './emoji'

export function BodyGrid({ bodies, basePath }: { bodies: Body[]; basePath: string }) {
  const { t, lang } = useLang()
  return (
    <ul className="body-grid" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {bodies.map((body) => (
        <li key={body.id} className="glass glass-glow body-card">
          <div className="body-card-head">
            <Emoji name={body.emoji} className="emoji" />
            <div>
              <h3 className="body-name">{t(body.name)}</h3>
              {lang === 'zh' && <p className="body-en">{body.name.en}</p>}
            </div>
          </div>
          <p className="body-tagline">{t(body.tagline)}</p>
          <Link href={`${basePath}/${body.id}`} className="btn btn-ghost btn-more" aria-label={`${t({ zh: '更多', en: 'More' })}: ${t(body.name)}`}>
            {t({ zh: '更多', en: 'More' })} →
          </Link>
        </li>
      ))}
    </ul>
  )
}
