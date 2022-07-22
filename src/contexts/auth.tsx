import { type FC } from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelectUserInfo } from '../store/slices/userInfoSlice'
import { UserRole } from '../constants'

interface RequireAuthProps {
  role?: keyof typeof UserRole | (keyof typeof UserRole)[]
}

export const RequireAuth: FC<RequireAuthProps> = ({ role }) => {
  const userInfo = useSelectUserInfo()
  const location = useLocation()

  // 未登录
  if (!userInfo.userId) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (role) {
    // 未符合指定角色权限
    if (
      (typeof role === 'string' && UserRole[role] !== userInfo.userRole) ||
      (Array.isArray(role) &&
        !role.map((k) => UserRole[k]).includes(userInfo.userRole))
    ) {
      return <Navigate to="/no-auth" replace />
    }
  }

  return <Outlet />
}
