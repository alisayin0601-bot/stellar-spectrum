'use client'

import { useLang } from '@/lib/i18n'

export function SiteFooter() {
  const { t } = useLang()
  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <p>{t({ zh: '星谱 · Stellar Spectrum', en: 'Stellar Spectrum · 星谱' })}</p>
        <p>{t({ zh: '数据参考 NASA 公开资料，仅用于科普学习。', en: 'Data based on public NASA resources, for learning only.' })}</p>
      </div>
    </footer>
  )
}
