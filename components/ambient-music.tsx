'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Ambient background music player.
 * Uses an HTML5 <audio> element with a provided audio file at /public/music/ambient.mp3.
 * Playback is controlled by a floating toggle and can be started externally
 * via a custom 'ambient:play' window event (used by the splash screen).
 */
export function AmbientMusic() {
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.45
    const onCanPlay = () => setReady(true)
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    const onEnded = () => setPlaying(false)
    audio.addEventListener('canplay', onCanPlay)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)
    return () => {
      audio.removeEventListener('canplay', onCanPlay)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
    }
  }, [])

  // Allow external components (splash screen) to start music on user gesture.
  useEffect(() => {
    const onPlayRequest = async () => {
      const audio = audioRef.current
      if (!audio) return
      try {
        audio.volume = 0.45
        await audio.play()
      } catch {
        /* autoplay may still be blocked; ignore */
      }
    }
    window.addEventListener('ambient:play', onPlayRequest)
    return () => window.removeEventListener('ambient:play', onPlayRequest)
  }, [])

  function toggle() {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) void audio.play()
    else audio.pause()
  }

  return (
    <>
      <audio ref={audioRef} loop preload="auto">
        <source src="/music/ambient.mp3" type="audio/mpeg" />
        <source src="/music/ambient.wav" type="audio/wav" />
        <source src="/music/ambient.ogg" type="audio/ogg" />
      </audio>
      <button
        type="button"
        className={`ambient-toggle ${playing ? 'is-playing' : ''} ${ready ? 'is-ready' : ''}`}
        onClick={toggle}
        aria-pressed={playing}
        aria-label={playing ? '暂停背景音乐' : '播放背景音乐'}
        title={playing ? 'Pause background music' : 'Play background music'}
      >
        <span className="ambient-bars" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </span>
        <span className="ambient-icon" aria-hidden="true">
          {playing ? (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M6 5h3v14H6zm9 0h3v14h-3z" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </span>
      </button>
    </>
  )
}
