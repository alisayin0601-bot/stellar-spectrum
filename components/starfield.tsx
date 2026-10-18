'use client'

import { useEffect, useState, type CSSProperties } from 'react'

type Star = { style: CSSProperties; className: string }

function createStars(count: number): Star[] {
  return Array.from({ length: count }, () => {
    const warm = Math.random() < 0.2
    const big = Math.random() < 0.1
    const size = Math.random() * 2 + (big ? 2 : 1)
    return {
      className: `star${warm ? ' star--warm' : ''}${big ? ' star--big' : ''}`,
      style: {
        width: size,
        height: size,
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${Math.random() * 3 + 2}s`,
        animationDelay: `${Math.random() * 3}s`,
      },
    }
  })
}

export function Starfield() {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    setStars(createStars(110))
  }, [])

  return (
    <div className="space-bg" aria-hidden="true">
      {stars.map((star, i) => (
        <span key={i} className={star.className} style={star.style} />
      ))}
    </div>
  )
}
