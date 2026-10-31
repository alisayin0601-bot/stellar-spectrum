import { SmallBodiesView } from '@/components/small-bodies-view'
import { useDocumentTitle } from '../use-document-title'

export function SmallBodiesPage() {
  useDocumentTitle('小天体 Small Bodies · 星谱')
  return <SmallBodiesView />
}
