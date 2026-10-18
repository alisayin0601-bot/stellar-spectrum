import { notFound } from 'next/navigation'
import { BodyDetail } from '@/components/body-detail'
import { SOLAR_BODIES } from '@/lib/data'

export function generateStaticParams() {
  return SOLAR_BODIES.map((b) => ({ id: b.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const body = SOLAR_BODIES.find((b) => b.id === id)
  return { title: body ? `${body.name.zh} ${body.name.en} · 星谱` : '星谱' }
}

export default async function SolarBodyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const index = SOLAR_BODIES.findIndex((b) => b.id === id)
  if (index === -1) notFound()
  const prev = SOLAR_BODIES[index - 1]
  const next = SOLAR_BODIES[index + 1]

  return (
    <BodyDetail
      body={SOLAR_BODIES[index]}
      backHref="/solar-system"
      backLabel={{ zh: '返回太阳系', en: 'Back to Solar System' }}
      prev={prev && { id: prev.id, name: prev.name }}
      next={next && { id: next.id, name: next.name }}
    />
  )
}
