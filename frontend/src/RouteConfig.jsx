import { lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const DummyPage = lazy(() => import('@/pages/dummy'))

export function RouteConfig() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<DummyPage />}></Route>
      </Routes>
    </Router>
  )
}
