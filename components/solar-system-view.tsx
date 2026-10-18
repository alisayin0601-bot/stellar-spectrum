'use client'

import dynamic from 'next/dynamic'
import { useLang } from '@/lib/i18n'
import { SOLAR_BODIES } from '@/lib/data'
import { BodyGrid } from './body-grid'
import { PageIntro } from './page-intro'

const SolarSystem3D = dynamic(() => import('./solar-system-3d'), {
  ssr: false,
  loading: () => <div className="solar-loading">Loading…</div>,
})

export function SolarSystemView() {
  const { t } = useLang()
  const labels = Object.fromEntries(SOLAR_BODIES.map((b) => [b.id, t(b.name)]))

  return (
    <>
      <PageIntro
        eyebrow="Solar System"
        title={{ zh: '太阳系', en: 'The Solar System' }}
        lead={{
          zh: '一颗恒星、八大行星，以及无数小天体。把鼠标移到天体上查看名称，点击进入详情，拖动可以旋转视角。',
          en: 'One star, eight planets and countless small bodies. Hover to see names, click to open details, and drag to rotate the view.',
        }}
      />
      <div className="wrap">
        <div className="solar-stage">
          <SolarSystem3D labels={labels} basePath="/solar-system" />
          <p className="solar-hint">{t({ zh: '悬停查看名称 · 点击查看详情 · 拖动旋转', en: 'Hover for names · Click for details · Drag to rotate' })}</p>
        </div>
      </div>
      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Sun & Planets</p>
          <h2 className="section-title" style={{ marginBottom: 24 }}>{t({ zh: '太阳与八大行星', en: 'The Sun & Eight Planets' })}</h2>
          <BodyGrid bodies={SOLAR_BODIES} basePath="/solar-system" />
        </div>
      </section>
    </>
  )
}
