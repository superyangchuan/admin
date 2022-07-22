import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useAppSelector } from '../hooks'
import type { UserInfo } from '../../interfaces'

const initialState: UserInfo = {
  userId: '',
  userName: '',
  userRole: 3,
}

const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    update(_, action: PayloadAction<UserInfo>) {
      return action.payload
    },
  },
})

export const useSelectUserInfo = () => useAppSelector((state) => state.userInfo)
export const { update } = userInfoSlice.actions

export default userInfoSlice.reducer
