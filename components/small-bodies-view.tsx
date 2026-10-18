'use client'

import { SMALL_BODIES } from '@/lib/data'
import { BodyGrid } from './body-grid'
import { PageIntro } from './page-intro'

export function SmallBodiesView() {
  return (
    <>
      <PageIntro
        eyebrow="Small Bodies"
        title={{ zh: '小天体', en: 'Small Bodies' }}
        lead={{
          zh: '除了太阳和行星，太阳系里还有数不清的小天体：拖着长尾的彗星、岩石小行星、环绕行星的卫星，以及化作流星的流星体。',
          en: 'Beyond the Sun and planets, the Solar System is full of small bodies: long-tailed comets, rocky asteroids, orbiting moons, and meteoroids that become shooting stars.',
        }}
      />
      <section className="section" style={{ paddingTop: 32 }}>
        <div className="wrap">
          <BodyGrid bodies={SMALL_BODIES} basePath="/small-bodies" />
        </div>
      </section>
    </>
  )
}
