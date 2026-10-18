import type { Metadata } from 'next'
import { UniverseView } from '@/components/universe-view'

export const metadata: Metadata = { title: '宇宙的故事 Story of the Universe · 星谱' }

export default function UniversePage() {
  return <UniverseView />
}
