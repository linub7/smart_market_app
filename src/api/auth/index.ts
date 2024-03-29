import { IForgotPassword, ISigninUser, ISignupUser } from 'src/@types/auth';
import client from '../client';
import catchAsyncError from '../catchError';

export const signupHandler = async (values: ISignupUser) => {
  try {
    const { data } = await client.post(`/auth/signup`, {
      ...values,
    });
    return { data };
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    return { err: errorMessage };
  }
};

export const signinHandler = async (values: ISigninUser) => {
  try {
    const { data } = await client.post(`/auth/signin`, {
      ...values,
    });
    return { data };
  } catch (error) {
    const errorMessage = catchAsyncError(error);
    return { err: errorMessage };
  }
};

export const forgetPasswordHandler = async (values: IForgotPassword) => {
  try {
    const { data } = await client.post(`/auth/forget-password`, {
      ...values,
    });
    return { data };
  } catch (error: any) {
    const errorMessage = catchAsyncError(error);
    return { err: errorMessage };
  }
};

export const getMeHandler = async (token: string) => {
  try {
    const { data } = await client.get(`/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error: any) {
    const errorMessage = catchAsyncError(error);
    return { err: errorMessage };
  }
};

export const testHandler = async (token: string) => {
  try {
    const { data } = await client.get(`/auth/test`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return { data };
  } catch (error: any) {
    const errorMessage = catchAsyncError(error);
    return { err: errorMessage };
  }
};

export const signoutHandler = async (token: string, refreshToken: string) => {
  try {
    const { data } = await client.post(
      `/auth/signout`,
      { refreshToken },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return { data };
  } catch (error: any) {
    const errorMessage = catchAsyncError(error);
    return { err: errorMessage };
  }
};

export const grantAccessTokenHandler = async (refreshToken: string) => {
  try {
    const { data } = await client.post(`/auth/refresh-token`, { refreshToken });
    return { data };
  } catch (error: any) {
    const errorMessage = catchAsyncError(error);
    return { err: errorMessage };
  }
};

export const refreshTokenHandler = async (refreshToken: string) => {
  try {
    const { data } = await client.post(`/auth/refresh-token`, { refreshToken });
    return { data };
  } catch (error: any) {
    const errorMessage = catchAsyncError(error);
    return { err: errorMessage };
  }
};
