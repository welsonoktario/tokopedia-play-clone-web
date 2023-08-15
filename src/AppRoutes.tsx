import loadable from '@loadable/component'
import { AnimatePresence } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'

export const AppRoutes = () => {
  const { pathname } = useLocation()

  const HomePage = loadable(() => import('@/pages/Home'), {
    resolveComponent: (component) => component.HomePage,
  })
  const VideoPage = loadable(() => import('@/pages/Video/Video'), {
    resolveComponent: (component) => component.VideoPage,
  })

  return (
    <AnimatePresence mode="wait">
      <Routes key={pathname}>
        <Route index path="/" element={<HomePage />} />
        <Route path="videos/:videoId" element={<VideoPage />} />
      </Routes>
    </AnimatePresence>
  )
}
