import { useEffect } from 'react'
import { Navigate, Outlet, Route, Routes, useLocation } from 'react-router-dom'
import { LangProvider } from '@/lib/i18n'
import { LIFE_STORIES, SMALL_BODIES, SOLAR_BODIES } from '@/lib/data'
import { Starfield } from '@/components/starfield'
import { AmbientMusic } from '@/components/ambient-music'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'
import { HomePage } from './pages/home-page'
import { SolarSystemPage } from './pages/solar-system-page'
import { SmallBodiesPage } from './pages/small-bodies-page'
import { UniversePage } from './pages/universe-page'
import { DeepSkyPage } from './pages/deep-sky-page'
import { StarLifePage } from './pages/star-life-page'
import { TonightPage } from './pages/tonight-page'
import { QuizPage } from './pages/quiz-page'
import { BodyDetailPage } from './pages/body-detail-page'

function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <>
      <Starfield />
      <div className="app">
        <SiteHeader />
        <main>
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <AmbientMusic />
    </>
  )
}

export function App() {
  return (
    <LangProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/solar-system" element={<SolarSystemPage />} />
          <Route
            path="/solar-system/:id"
            element={<BodyDetailPage bodies={SOLAR_BODIES} backHref="/solar-system" backLabel={{ zh: '返回太阳系', en: 'Back to Solar System' }} browsable />}
          />
          <Route path="/small-bodies" element={<SmallBodiesPage />} />
          <Route
            path="/small-bodies/:id"
            element={<BodyDetailPage bodies={SMALL_BODIES} backHref="/small-bodies" backLabel={{ zh: '返回小天体', en: 'Back to Small Bodies' }} browsable />}
          />
          <Route path="/universe" element={<UniversePage />} />
          <Route
            path="/universe/:id"
            element={<BodyDetailPage bodies={LIFE_STORIES} backHref="/universe" backLabel={{ zh: '返回宇宙的故事', en: 'Back to the Universe' }} />}
          />
          <Route path="/deep-sky" element={<DeepSkyPage />} />
          <Route path="/star-life" element={<StarLifePage />} />
          <Route path="/tonight" element={<TonightPage />} />
          <Route path="/quiz" element={<QuizPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </LangProvider>
  )
}
