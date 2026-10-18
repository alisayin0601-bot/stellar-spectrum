import type { Metadata } from 'next'
import { SmallBodiesView } from '@/components/small-bodies-view'

export const metadata: Metadata = { title: '小天体 Small Bodies · 星谱' }

export default function SmallBodiesPage() {
  return <SmallBodiesView />
}
