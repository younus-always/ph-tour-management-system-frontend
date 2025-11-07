export interface ISendOtp {
      email: string;
};

export interface IVerifyOtp {
      email: string;
      otp: string;
};

export interface ILogin {
      email: string;
      password: string;
};

export interface IRegister {
      name: string;
      email: string;
      password: string;
};

// Response interfaces type

// login response
export interface ILoginResponse {
      accessToken: string
      refreshToken: string
      user: User
}

export interface User {
      _id: string
      name: string
      email: string
      phone: string
      address: string
      isDeleted: boolean
      isVerified: boolean
      isActive: string
      role: string
      auths: Auth[]
      createdAt: string
      updatedAt: string
}

// register response
export interface IRegisterResponse {
      _id: string
      name: string
      email: string
      password: string
      phone: string
      address: string
      isDeleted: boolean
      isVerified: boolean
      isActive: string
      role: string
      auths: Auth[]
      createdAt: string
      updatedAt: string
}

export interface Auth {
      provider: string
      providerId: string
}
