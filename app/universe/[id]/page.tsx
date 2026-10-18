import { notFound } from 'next/navigation'
import { BodyDetail } from '@/components/body-detail'
import { LIFE_STORIES } from '@/lib/data'

export function generateStaticParams() {
  return LIFE_STORIES.map((b) => ({ id: b.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const story = LIFE_STORIES.find((b) => b.id === id)
  return { title: story ? `${story.name.zh} ${story.name.en} · 星谱` : '星谱' }
}

export default async function LifeStoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const story = LIFE_STORIES.find((b) => b.id === id)
  if (!story) notFound()
  return <BodyDetail body={story} backHref="/universe" backLabel={{ zh: '返回宇宙的故事', en: 'Back to the Universe' }} />
}
