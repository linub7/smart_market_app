export interface ISignupUser {
  name: string;
  email: string;
  password: string;
}

export interface ISigninUser {
  email: string;
  password: string;
}

export interface IForgotPassword {
  email: string;
}
