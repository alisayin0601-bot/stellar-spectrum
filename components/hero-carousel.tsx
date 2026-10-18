'use client'

import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/lib/i18n'
import { SLIDES } from '@/lib/data'

export function HeroCarousel() {
  const { t } = useLang()
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const slides = Array.from(track.children) as HTMLElement[]
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(slides.indexOf(entry.target as HTMLElement))
        })
      },
      { root: track, threshold: 0.6 },
    )
    slides.forEach((slide) => observer.observe(slide))
    return () => observer.disconnect()
  }, [])

  const goTo = (index: number) => {
    const track = trackRef.current
    if (!track) return
    const clamped = (index + SLIDES.length) % SLIDES.length
    const slide = track.children[clamped] as HTMLElement
    track.scrollTo({ left: slide.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft), behavior: 'smooth' })
  }

  return (
    <section className="section" aria-roledescription="carousel" aria-label={t({ zh: '精选天体', en: 'Featured' })}>
      <div className="wrap carousel-head">
        <div>
          <p className="eyebrow">Featured</p>
          <h2 className="section-title">{t({ zh: '精选天体', en: 'Featured Wonders' })}</h2>
        </div>
        <div className="carousel-ctrl">
          <button type="button" className="icon-btn" onClick={() => goTo(active - 1)} aria-label={t({ zh: '上一张', en: 'Previous' })}>
            ←
          </button>
          <button type="button" className="icon-btn" onClick={() => goTo(active + 1)} aria-label={t({ zh: '下一张', en: 'Next' })}>
            →
          </button>
        </div>
      </div>

      <div className="carousel" ref={trackRef}>
        {SLIDES.map((slide, i) => (
          <figure key={slide.src} className="slide" style={{ margin: 0 }} aria-label={`${i + 1} / ${SLIDES.length}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={slide.src} alt={t(slide.title)} loading={i < 2 ? 'eager' : 'lazy'} />
            <figcaption className="slide-info">
              <p className="slide-index">{String(i + 1).padStart(2, '0')} / {String(SLIDES.length).padStart(2, '0')}</p>
              <h3 className="slide-title">{t(slide.title)}</h3>
              <p className="slide-caption">{t(slide.caption)}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="dots">
        {SLIDES.map((slide, i) => (
          <button
            key={slide.src}
            type="button"
            className="dot"
            aria-current={i === active}
            aria-label={`${t({ zh: '第', en: 'Slide ' })}${i + 1}${t({ zh: '张', en: '' })}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  )
}
