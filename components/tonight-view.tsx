'use client'

import { useLang } from '@/lib/i18n'
import { TONIGHT_DATA } from '@/lib/data'
import { Emoji } from './emoji'

/** Tonight's Sky: beginner-friendly stargazing guide. */
export function TonightView() {
  const { t } = useLang()
  const d = TONIGHT_DATA

  return (
    <section className="section">
      <div className="wrap">
        <p className="eyebrow">Stargazing</p>
        <h2 className="section-title">{t({ zh: '今晚星空', en: "Tonight's Sky" })}</h2>
        <p className="lead" style={{ marginBottom: 28 }}>{t(d.intro)}</p>

        <div className="tonight-grid">
          <div className="glass tonight-card">
            <h3 className="tonight-card-title">
              <Emoji name="saturn" className="emoji" />
              {t({ zh: '可见行星', en: 'Visible Planets' })}
            </h3>
            <ul className="tonight-list">
              {d.visiblePlanets.map((p) => (
                <li key={p.id}>
                  <Emoji name={p.emoji} className="emoji" />
                  <div>
                    <span className="tonight-item-title">{t(p.title)}</span>
                    <span className="tonight-item-detail">{t(p.detail)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass tonight-card">
            <h3 className="tonight-card-title">
              <Emoji name="moon" className="emoji" />
              {t({ zh: '月相', en: 'Moon Phase' })}
            </h3>
            <p className="tonight-item-detail">{t(d.moonPhase)}</p>
          </div>

          <div className="glass tonight-card">
            <h3 className="tonight-card-title">
              <Emoji name="meteoroid" className="emoji" />
              {t({ zh: '流星雨', en: 'Meteor Showers' })}
            </h3>
            <ul className="tonight-list">
              {d.meteorShowers.map((m) => (
                <li key={m.id}>
                  <Emoji name={m.emoji} className="emoji" />
                  <div>
                    <span className="tonight-item-title">{t(m.title)}</span>
                    <span className="tonight-item-detail">{t(m.detail)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="glass tonight-card">
            <h3 className="tonight-card-title">
              <Emoji name="telescope" className="emoji" />
              {t({ zh: '观星小贴士', en: 'Stargazing Tips' })}
            </h3>
            <ul className="tonight-tips">
              {d.tips.map((tip, i) => (
                <li key={i}>{t(tip)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
