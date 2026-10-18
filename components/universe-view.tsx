'use client'

import { useLang } from '@/lib/i18n'
import { LIFE_STORIES, TIMELINE, UNIVERSE_STORY } from '@/lib/data'
import { BodyGrid } from './body-grid'
import { PageIntro } from './page-intro'

export function UniverseView() {
  const { t } = useLang()
  return (
    <>
      <PageIntro
        eyebrow="Story of the Universe"
        title={{ zh: '宇宙的故事', en: 'The Story of the Universe' }}
        lead={{ zh: '一切从 138 亿年前开始。', en: 'It all began 13.8 billion years ago.' }}
      />
      <section className="section" style={{ paddingTop: 32 }}>
        <div className="wrap">
          <ol className="timeline" style={{ listStyle: 'none', padding: 0 }}>
            {TIMELINE.map((item) => (
              <li key={item.time.en} className="glass tl-item">
                <p className="tl-time">{t(item.time)}</p>
                <p className="tl-event">{t(item.event)}</p>
              </li>
            ))}
          </ol>
          <div className="glass story-card">
            <p>{t(UNIVERSE_STORY)}</p>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 16 }}>
        <div className="wrap">
          <p className="eyebrow">Life Cycles</p>
          <h2 className="section-title" style={{ marginBottom: 24 }}>{t({ zh: '星辰的一生', en: 'Cosmic Life Cycles' })}</h2>
          <BodyGrid bodies={LIFE_STORIES} basePath="/universe" />
        </div>
      </section>
    </>
  )
}
