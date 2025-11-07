export type { ISendOtp, IVerifyOtp, ILogin, IRegister, ILoginResponse, IRegisterResponse } from './auth.type';

export interface IResponse<T> {
      success: boolean
      statusCode: number
      message: string
      data: T
};