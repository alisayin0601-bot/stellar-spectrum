import { PageIntro } from '@/components/page-intro'
import { DeepSkyView } from '@/components/deep-sky-view'

export default function DeepSkyPage() {
  return (
    <>
      <PageIntro
        eyebrow="Gallery"
        title={{ zh: '深空摄影', en: 'Deep-Sky Photography' }}
        lead={{ zh: '哈勃/韦伯视觉奇观，沉浸式美术馆。', en: 'Hubble/JWST visual wonders, an immersive gallery.' }}
      />
      <DeepSkyView />
    </>
  )
}
