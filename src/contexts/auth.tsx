import {
  type FC,
  type PropsWithChildren,
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
} from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import type { UserInfo } from '../interfaces'
import { UserRole } from '../constants'

interface AuthContextType {
  userInfo: UserInfo
  signIn: (userInfo: UserInfo, cb?: VoidFunction) => void
  signOut: (cb?: VoidFunction) => void
}

const AuthContext = createContext<AuthContextType>(null!)
export const useAuth = () => useContext(AuthContext)

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo>(null!)

  const signIn = useCallback((newUser: UserInfo, cb?: VoidFunction) => {
    setUserInfo(newUser)
    cb?.()
  }, [])

  const signOut = useCallback((cb?: VoidFunction) => {
    setUserInfo(null!)
    cb?.()
  }, [])

  const value = useMemo(
    () => ({ userInfo, signIn, signOut }),
    [userInfo, signIn, signOut]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

interface RequireAuthProps {
  role: keyof typeof UserRole | (keyof typeof UserRole)[]
}

export const RequireAuth: FC<RequireAuthProps> = ({ role }) => {
  const { userInfo } = useAuth()
  const location = useLocation()

  // 未登录
  if (!userInfo) {
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
