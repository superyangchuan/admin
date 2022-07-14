import type { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/auth'

const Login: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const auth = useAuth()

  function submit() {
    auth.signIn(
      {
        userId: '001',
        userName: 'yangchuan',
        userRole: 0,
      },
      () => {
        const state: any = location.state
        const from = state?.from?.pathname ?? '/'
        navigate(from, { replace: true })
      }
    )
  }

  return <div onClick={submit}>Login...</div>
}

export default Login
