'use client'

import { PageIntro } from './page-intro'
import { Quiz } from './quiz'

export function QuizView() {
  return (
    <>
      <PageIntro
        eyebrow="Quiz"
        title={{ zh: '天文问答', en: 'Astronomy Quiz' }}
        lead={{ zh: '学完了？来检验一下你的星空知识吧。', en: 'Done exploring? Put your space knowledge to the test.' }}
      />
      <section className="section" style={{ paddingTop: 0 }}>
        <Quiz />
      </section>
    </>
  )
}
