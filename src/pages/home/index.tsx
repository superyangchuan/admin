import type { FC } from 'react'
import { useSelectUserInfo } from '../../store/slices/userInfoSlice'

const Home: FC = () => {
  const userInfo = useSelectUserInfo()

  return <div>Home {userInfo.userName}</div>
}

export default Home
