'use client'

import { useRef, useState } from 'react'
import { useLang } from '@/lib/i18n'
import { DEEP_SKY_ITEMS } from '@/lib/data'

/** Deep-Sky Photography: immersive gallery with before/after comparison slider. */
export function DeepSkyView() {
  const { t } = useLang()
  const [active, setActive] = useState(0)
  const item = DEEP_SKY_ITEMS[active]

  return (
    <>
      <section className="section">
        <div className="wrap">
          <p className="eyebrow">Hubble / JWST</p>
          <h2 className="section-title">{t({ zh: '深空摄影', en: 'Deep-Sky Photography' })}</h2>
          <p className="lead" style={{ marginBottom: 28 }}>
            {t({
              zh: '哈勃与韦伯望远镜带来的视觉奇观。拖动滑块对比未加工与已加工图像。',
              en: 'Visual wonders from Hubble and JWST. Drag the slider to compare raw and processed images.',
            })}
          </p>

          <div className="deep-sky-layout">
            <div className="deep-sky-gallery">
              {DEEP_SKY_ITEMS.map((it, i) => (
                <button
                  key={it.id}
                  type="button"
                  className={`ds-thumb ${i === active ? 'is-active' : ''}`}
                  onClick={() => setActive(i)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={it.afterImage} alt={t(it.title)} loading="lazy" />
                  <span className="ds-thumb-label">{t(it.title)}</span>
                </button>
              ))}
            </div>

            <div className="deep-sky-main">
              <BeforeAfter
                beforeImage={item.beforeImage}
                afterImage={item.afterImage}
                beforeLabel={t(item.beforeLabel)}
                afterLabel={t(item.afterLabel)}
                title={t(item.title)}
              />
              <div className="ds-info">
                <h3 className="ds-title">{t(item.title)}</h3>
                <p className="ds-source">{t(item.source)}</p>
                <p className="ds-caption">{t(item.caption)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

function BeforeAfter({
  beforeImage,
  afterImage,
  beforeLabel,
  afterLabel,
  title,
}: {
  beforeImage: string
  afterImage: string
  beforeLabel: string
  afterLabel: string
  title: string
}) {
  const [pct, setPct] = useState(50)
  const ref = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const update = (clientX: number) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const ratio = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width))
    setPct(ratio * 100)
  }

  return (
    <div
      ref={ref}
      className="ba-container"
      onMouseMove={(e) => dragging.current && update(e.clientX)}
      onMouseDown={(e) => { dragging.current = true; update(e.clientX) }}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onTouchMove={(e) => update(e.touches[0].clientX)}
      onTouchStart={(e) => update(e.touches[0].clientX)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="ba-after" src={afterImage} alt={title} />
      {beforeImage ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ba-before" src={beforeImage} alt={`${title} raw`} style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }} />
          <div className="ba-labels">
            <span className="ba-label ba-label-before">{beforeLabel}</span>
            <span className="ba-label ba-label-after">{afterLabel}</span>
          </div>
        </>
      ) : (
        <div className="ba-placeholder" style={{ width: `${100 - pct}%` }}>
          <span>{beforeLabel}</span>
          <span className="ba-placeholder-hint">待补充 / Coming soon</span>
        </div>
      )}
      <div className="ba-divider" style={{ left: `${pct}%` }}>
        <span className="ba-handle" aria-hidden="true">⟺</span>
      </div>
    </div>
  )
}
