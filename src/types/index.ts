import type { Icon, IconProps } from '@tabler/icons-react';
import type { ComponentType, ForwardRefExoticComponent, RefAttributes } from 'react';

export type { ISendOtp, IVerifyOtp, ILogin, IRegister, ILoginResponse, IRegisterResponse } from './auth.type';
export type { ITourPackage } from './tour.type';

export interface IResponse<T> {
      success: boolean
      statusCode: number
      message: string
      data: T
      meta?: {
            page: number
            limit: number
            total: number
            totalPage: number
      }
};

export interface ISidebarItem {
      title: string;
      items: {
            title: string;
            url: string;
            icon?: ForwardRefExoticComponent<IconProps & RefAttributes<Icon>>;
            component: ComponentType
      }[]
};

export type TRole = "SUPER_ADMIN" | "ADMIN" | "USER";