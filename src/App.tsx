import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/auth'
import BaseLayout from './layouts/BaseLayout'
import Index from './pages'
import Login from './pages/login'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<BaseLayout />}>
          <Route path="/*" element={<Index />} />
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </AuthProvider>
  )
}

export default App
