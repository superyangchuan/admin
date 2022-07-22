import { Routes, Route } from 'react-router-dom'
import BaseLayout from './layouts/BaseLayout'
import { RequireAuth } from './contexts/auth'
import Home from './pages/home'
import NotAuth from './pages/NotAuth'
import NotFound from './pages/NotFound'
import Login from './pages/login'
import './App.css'

function App() {
  return (
    <Routes>
      <Route element={<BaseLayout />}>
        <Route element={<RequireAuth />}>
          <Route index element={<Home />} />
        </Route>
        <Route path="no-auth" element={<NotAuth />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}

export default App
