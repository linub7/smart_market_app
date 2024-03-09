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
