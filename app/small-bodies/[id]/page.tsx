import { notFound } from 'next/navigation'
import { BodyDetail } from '@/components/body-detail'
import { SMALL_BODIES } from '@/lib/data'

export function generateStaticParams() {
  return SMALL_BODIES.map((b) => ({ id: b.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = SMALL_BODIES.find((b) => b.id === id)
  return { title: body ? `${body.name.zh} ${body.name.en} · 星谱` : '星谱' }
}

export default async function SmallBodyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const index = SMALL_BODIES.findIndex((b) => b.id === id)
  if (index === -1) notFound()
  const prev = SMALL_BODIES[index - 1]
  const next = SMALL_BODIES[index + 1]

  return (
    <BodyDetail
      body={SMALL_BODIES[index]}
      backHref="/small-bodies"
      backLabel={{ zh: '返回小天体', en: 'Back to Small Bodies' }}
      prev={prev && { id: prev.id, name: prev.name }}
      next={next && { id: next.id, name: next.name }}
    />
  )
}
