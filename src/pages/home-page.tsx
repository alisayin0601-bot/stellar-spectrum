import { useEffect, useState } from 'react'
import { HomeHero } from '@/components/home-hero'
import { HeroCarousel } from '@/components/hero-carousel'
import { ArticleBoard } from '@/components/article-board'
import { SplashIntro } from '@/components/splash-intro'
import { useDocumentTitle } from '../use-document-title'

export function HomePage() {
  const [entered, setEntered] = useState(false)
  useDocumentTitle('星谱 · Stellar Spectrum')

  useEffect(() => {
    if (sessionStorage.getItem('ss_entered') === '1') setEntered(true)
  }, [])

  function handleEnter() {
    sessionStorage.setItem('ss_entered', '1')
    setEntered(true)
  }

  if (!entered) {
    return <SplashIntro onEnter={handleEnter} />
  }

  return (
    <>
      <HomeHero />
      <HeroCarousel />
      <ArticleBoard />
    </>
  )
}
