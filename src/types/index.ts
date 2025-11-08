import type { ComponentType } from 'react';

export type { ISendOtp, IVerifyOtp, ILogin, IRegister, ILoginResponse, IRegisterResponse } from './auth.type';

export interface IResponse<T> {
      success: boolean
      statusCode: number
      message: string
      data: T
};

export interface ISidebarItem {
      title: string;
      items: {
            title: string;
            url: string;
            component: ComponentType
      }[]
};

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";