/** 角色 */
const UserRole = {
  /** 拥有者 */
  owner: 0,

  /** 管理员 */
  manager: 1,

  /** 用户 */
  user: 2,

  /** 未登录 */
  anonymous: 3,
} as const

export default UserRole
