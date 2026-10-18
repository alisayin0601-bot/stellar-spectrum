import { HomeHero } from '@/components/home-hero'
import { HeroCarousel } from '@/components/hero-carousel'
import { ArticleBoard } from '@/components/article-board'

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HeroCarousel />
      <ArticleBoard />
    </>
  )
}
