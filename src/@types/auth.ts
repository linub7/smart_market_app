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

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  verified: boolean;
  avatar?: string;
}

export interface AuthState {
  profile: UserProfile | null;
  loggedIn: boolean;
  loading: boolean;
}
