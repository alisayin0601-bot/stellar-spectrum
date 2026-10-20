import { PageIntro } from '@/components/page-intro'
import { StarLifeView } from '@/components/star-life-view'

export default function StarLifePage() {
  return (
    <>
      <PageIntro
        eyebrow="Evolution"
        title={{ zh: '星的一生', en: 'Life of Stars' }}
        lead={{ zh: '宇宙的一生变为星的故事，分叉图动画。', en: 'The universe as the story of stars, with an animated branching diagram.' }}
      />
      <StarLifeView />
    </>
  )
}
