import { UserRole } from '../constants'

export default interface UserInfo {
  /** 账号 */
  userId: string

  /** 用户名 */
  userName: string

  /** 角色 */
  userRole: typeof UserRole[keyof typeof UserRole]

  /** 额外的权限 */
  extraPermissions?: string | string[]

  [k: string]: any
}
