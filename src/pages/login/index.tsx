import type { FC } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../store/hooks'
import { update } from '../../store/slices/userInfoSlice'

const Login: FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  function submit() {
    dispatch(
      update({
        userId: '001',
        userName: 'yangchuan',
        userRole: 0,
      })
    )
    const state: any = location.state
    const from = state?.from?.pathname ?? '/'
    navigate(from, { replace: true })
  }

  return <div onClick={submit}>Login...</div>
}

export default Login
