import { UniverseView } from '@/components/universe-view'
import { useDocumentTitle } from '../use-document-title'

export function UniversePage() {
  useDocumentTitle('宇宙的故事 Story of the Universe · 星谱')
  return <UniverseView />
}
