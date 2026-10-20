'use client'

import { useState } from 'react'
import { useLang } from '@/lib/i18n'
import { STAR_BRANCH_NODES, STAR_BRANCH_LINKS } from '@/lib/data'

/** Star Life: animated branching diagram showing a star's fate by mass. */
export function StarLifeView() {
  const { t } = useLang()
  const [selected, setSelected] = useState<string | null>(null)
  const [revealed, setRevealed] = useState<Set<string>>(new Set(['nebula', 'protostar', 'main-sequence']))

  const nodeMap = new Map(STAR_BRANCH_NODES.map((n) => [n.id, n]))

  function activate(id: string) {
    setSelected(id)
    // Reveal downstream nodes progressively.
    const next = new Set(revealed)
    const queue = [id]
    while (queue.length) {
      const cur = queue.shift()!
      STAR_BRANCH_LINKS.filter((l) => l.from === cur).forEach((l) => {
        if (!next.has(l.to)) {
          next.add(l.to)
          queue.push(l.to)
        }
      })
    }
    setRevealed(next)
  }

  return (
    <section className="section">
      <div className="wrap">
        <p className="eyebrow">Stellar Evolution</p>
        <h2 className="section-title">{t({ zh: '星的一生', en: 'Life of Stars' })}</h2>
        <p className="lead" style={{ marginBottom: 28 }}>
          {t({
            zh: '宇宙的一生变为星的故事。点击节点，逐步揭示恒星按质量走向的不同命运。',
            en: 'The life of the universe told through stars. Click nodes to reveal the branching fates by mass.',
          })}
        </p>

        <div className="star-branch">
          <svg className="sb-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {STAR_BRANCH_LINKS.map((link, i) => {
              const from = nodeMap.get(link.from)!
              const to = nodeMap.get(link.to)!
              const visible = revealed.has(link.to)
              return (
                <line
                  key={i}
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  className={`sb-link ${visible ? 'is-visible' : ''} ${link.type === 0 ? 'sb-trunk' : 'sb-branch'}`}
                  style={{ transitionDelay: `${i * 0.1}s` }}
                />
              )
            })}
          </svg>

          {STAR_BRANCH_NODES.map((node) => {
            const isVisible = revealed.has(node.id)
            const isSelected = selected === node.id
            return (
              <button
                key={node.id}
                type="button"
                className={`sb-node ${isVisible ? 'is-visible' : ''} ${isSelected ? 'is-selected' : ''}`}
                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                onClick={() => activate(node.id)}
                tabIndex={isVisible ? 0 : -1}
              >
                <span className="sb-node-label">{t(node.label)}</span>
                {node.mass.zh !== '—' && <span className="sb-node-mass">{t(node.mass)}</span>}
              </button>
            )
          })}
        </div>

        {selected && nodeMap.get(selected) && (
          <div className="sb-detail glass">
            <h3 className="ds-title">{t(nodeMap.get(selected)!.label)}</h3>
            <p className="ds-caption">{t(nodeMap.get(selected)!.desc)}</p>
          </div>
        )}
      </div>
    </section>
  )
}
