import { ResponseCode } from '../constants'

export default interface ResponseObject<T = any> {
  readonly errCode: typeof ResponseCode[keyof typeof ResponseCode]
  readonly errMsg: string
  data: T
  traceId?: string
  [k: string]: any
}
