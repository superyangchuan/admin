import type { FC } from 'react'
import { Routes, Route } from 'react-router-dom'
import { RequireAuth } from '../contexts/auth'
import Home from './home'
import NotAuth from './NotAuth'
import NotFound from './NotFound'

const Index: FC = () => {
  return (
    <Routes>
      <Route element={<RequireAuth role="owner" />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="no-auth" element={<NotAuth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default Index
