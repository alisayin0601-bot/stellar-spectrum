'use client'

import { useEffect, useState } from 'react'

/**
 * Full-screen intro splash: the italic title wipes in from the left after 3s,
 * then "Click anywhere to start" fades in 2s later. Clicking anywhere (or pressing
 * Enter/Space) fades out the splash, starts the background music (via window event), then unmounts.
 */
export function SplashIntro({ onEnter }: { onEnter?: () => void }) {
  const [leaving, setLeaving] = useState(false)
  const [gone, setGone] = useState(false)

  function enter() {
    if (leaving) return
    setLeaving(true)
    // This call happens inside a click or key handler, a user gesture, so the
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
    <div
      className={`splash ${leaving ? 'is-leaving' : ''}`}
      role="dialog"
      aria-label="Welcome"
      onClick={enter}
    >
      <div className="splash-bg" aria-hidden="true" />
      <div className="splash-inner">
        <h1 className="splash-title glow-text">Stellar Spectrum</h1>
        <p className="splash-prompt">Click anywhere to start</p>
      </div>
    </div>
  )
}
