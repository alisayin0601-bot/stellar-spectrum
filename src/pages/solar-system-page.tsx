import { SolarSystemView } from '@/components/solar-system-view'
import { useDocumentTitle } from '../use-document-title'

export function SolarSystemPage() {
  useDocumentTitle('太阳系 Solar System · 星谱')
  return <SolarSystemView />
}
