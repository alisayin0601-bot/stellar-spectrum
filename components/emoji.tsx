'use client'

import { useState } from 'react'
import { EMOJI, type EmojiKey } from '@/lib/data'

export function Emoji({ name, className = 'emoji', label }: { name: EmojiKey; className?: string; label?: string }) {
  const [failed, setFailed] = useState(false)
  const item = EMOJI[name]

  if (failed) {
    return (
      <span className={`${className} emoji-native`} role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true}>
        {item.native}
      </span>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={item.src}
      alt={label ?? ''}
      aria-hidden={label ? undefined : true}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
    />
  )
}
