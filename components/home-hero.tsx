'use client'

import Link from 'next/link'
import { useLang } from '@/lib/i18n'
import { TOPICS } from '@/lib/data'
import { Emoji } from './emoji'

export function HomeHero() {
  const { t } = useLang()
  const featured = TOPICS.filter((tp) => tp.featured)

  return (
    <section className="home-hero">
      <div className="wrap">
        <p className="eyebrow reveal">Astronomy for everyone</p>
        <p className="hero-lead reveal" style={{ marginTop: 8 }}>
          {t({
            zh: '从太阳系出发，穿过彗星与小行星，回到 138 亿年前的宇宙起点。',
            en: 'Start in our Solar System, fly past comets and asteroids, and travel back 13.8 billion years to the dawn of the universe.',
          })}
        </p>

        <nav className="topic-row" aria-label={t({ zh: '科普栏目', en: 'Topics' })}>
          {featured.map((topic, i) => (
            <Link
              key={topic.id}
              href={topic.href}
              className="glass glass-glow topic-card reveal"
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              <Emoji name={topic.emoji} className="emoji" />
              <span>
                <span className="topic-title" style={{ display: 'block', fontFamily: 'var(--display)', fontWeight: 600 }}>
                  {t(topic.title)}
                </span>
                <span className="topic-desc" style={{ display: 'block' }}>
                  {t(topic.desc)}
                </span>
              </span>
              <span className="topic-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          ))}
        </nav>
      </div>
    </section>
  )
}
