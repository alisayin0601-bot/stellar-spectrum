import { PageIntro } from '@/components/page-intro'
import { TonightView } from '@/components/tonight-view'

export default function TonightPage() {
  return (
    <>
      <PageIntro
        eyebrow="Stargazing"
        title={{ zh: '今晚星空', en: "Tonight's Sky" }}
        lead={{ zh: '小白向的浪漫观星与天象指南。', en: 'A beginner-friendly romantic stargazing and sky guide.' }}
      />
      <TonightView />
    </>
  )
}
