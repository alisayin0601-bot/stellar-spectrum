'use client'

import { useEffect, useRef, useState } from 'react'
import { useLang } from '@/lib/i18n'

/**
 * Full-screen intro splash showing the site title and a "Start Exploring" button.
 * On click: fades out, starts the background music (via window event), then unmounts.
 */
export function SplashIntro({ onEnter }: { onEnter?: () => void }) {
  const { t } = useLang()
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)
  const btnRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    btnRef.current?.focus()
  }, [])

  function enter() {
    if (leaving) return
    setLeaving(true)
    // This call happens inside a click handler — a user gesture — so the
    // browser allows audio to start.
    window.dispatchEvent(new CustomEvent('ambient:play'))
    window.setTimeout(() => {
      setGone(true)
      onEnter?.()
    }, 900)
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        enter()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (gone) return null

  return (
    <div className={`splash ${leaving ? 'is-leaving' : ''}`} role="dialog" aria-label={t({ zh: '欢迎', en: 'Welcome' })}>
      <div className="splash-bg" aria-hidden="true" />
      <div className="splash-inner">
        <p className="splash-eyebrow">{t({ zh: 'Astronomy for everyone', en: 'Astronomy for everyone' })}</p>
        <h1 className="splash-title glow-text">
          {t({ zh: '星谱', en: 'Stellar Spectrum' })}
        </h1>
        <p className="splash-sub">{t({ zh: 'Stellar Spectrum', en: '星谱 · Stellar Spectrum' })}</p>
        <button ref={btnRef} type="button" className="splash-cta" onClick={enter}>
          <span>{t({ zh: '开始探索', en: 'Start Exploring' })}</span>
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <p className="splash-hint">{t({ zh: '点击按钮后开启声音', en: 'Sound begins after you enter' })}</p>
      </div>
    </div>
  )
}
