import type { Metadata } from 'next'
import { SolarSystemView } from '@/components/solar-system-view'

export const metadata: Metadata = { title: '太阳系 Solar System · 星谱' }

export default function SolarSystemPage() {
  return <SolarSystemView />
}
