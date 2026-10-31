'use client'

import { Link } from 'react-router-dom'
import { useLang, type L } from '@/lib/i18n'
import type { Body, LifeStage } from '@/lib/data'
import { Emoji } from './emoji'

type Props = {
  body: Body & { stages?: LifeStage[] }
  backHref: string
  backLabel: L
  prev?: { id: string; name: L }
  next?: { id: string; name: L }
}

export function BodyDetail({ body, backHref, backLabel, prev, next }: Props) {
  const { t, lang } = useLang()

  return (
    <article className="section" style={{ paddingTop: 48 }}>
      <div className="wrap" style={{ maxWidth: 900 }}>
        <Link to={backHref} className="btn btn-ghost btn-sm back-link">
          ← {t(backLabel)}
        </Link>

        <header className="detail-hero reveal">
          <Emoji name={body.emoji} className="emoji" />
          <div>
            <h1 className="detail-title glow-text">{t(body.name)}</h1>
            {lang === 'zh' && <p className="detail-en">{body.name.en}</p>}
            <p className="lead" style={{ marginTop: 8 }}>{t(body.tagline)}</p>
          </div>
        </header>

        {body.stats.length > 0 && (
          <dl className="stats">
            {body.stats.map((s) => (
              <div key={s.label.en} className="glass stat">
                <dt>{t(s.label)}</dt>
                <dd>{t(s.value)}</dd>
              </div>
            ))}
          </dl>
        )}

        {body.images.length > 0 && (
          <div className="gallery">
            {body.images.map((src, i) => (
                            <img key={src} src={src} alt={`${t(body.name)} ${i + 1}`} loading="lazy" />
            ))}
          </div>
        )}

        <div className="glass prose">
          {body.paragraphs.map((p, i) => (
            <p key={i}>{t(p)}</p>
          ))}
        </div>

        {body.stages && (
          <ol className="stages" style={{ listStyle: 'none', padding: 0 }}>
            {body.stages.map((stage) => (
              <li key={stage.title.en} className="glass stage">
                <h3>{t(stage.title)}</h3>
                <p>{t(stage.text)}</p>
              </li>
            ))}
          </ol>
        )}

        {(prev || next) && (
          <nav className="detail-nav" aria-label={t({ zh: '切换天体', en: 'Browse' })}>
            {prev ? (
              <Link to={`${backHref}/${prev.id}`} className="btn btn-ghost">← {t(prev.name)}</Link>
            ) : <span />}
            {next && <Link to={`${backHref}/${next.id}`} className="btn btn-primary">{t(next.name)} →</Link>}
          </nav>
        )}
      </div>
    </article>
  )
}
