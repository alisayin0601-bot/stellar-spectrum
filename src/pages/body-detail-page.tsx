import { useParams } from 'react-router-dom'
import { BodyDetail } from '@/components/body-detail'
import { useLang, type L } from '@/lib/i18n'
import type { Body } from '@/lib/data'
import { useDocumentTitle } from '../use-document-title'

type Props = {
  bodies: Body[]
  backHref: string
  backLabel: L
  browsable?: boolean
}

export function BodyDetailPage({ bodies, backHref, backLabel, browsable = false }: Props) {
  const { id } = useParams()
  const { t } = useLang()
  const index = bodies.findIndex((b) => b.id === id)
  const body = bodies[index]

  useDocumentTitle(body ? `${body.name.zh} ${body.name.en} · 星谱` : '星谱')

  if (!body) {
    return (
      <section className="section">
        <div className="wrap">
          <p className="lead">{t({ zh: '没有找到这个页面。', en: 'This page could not be found.' })}</p>
        </div>
      </section>
    )
  }

  const prev = browsable ? bodies[index - 1] : undefined
  const next = browsable ? bodies[index + 1] : undefined

  return (
    <BodyDetail
      body={body}
      backHref={backHref}
      backLabel={backLabel}
      prev={prev && { id: prev.id, name: prev.name }}
      next={next && { id: next.id, name: next.name }}
    />
  )
}
