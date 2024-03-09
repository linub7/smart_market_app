import * as Yup from 'yup';

import { EMAIL_REGEX, PASSWORD_REGEX } from 'src/constants';

Yup.addMethod(Yup.string, 'email', function validateEmail(message) {
  return this.matches(EMAIL_REGEX, {
    message,
    name: 'email',
    excludeEmptyString: true,
  });
});

const password = {
  password: Yup.string()
    .trim()
    .required('Password is required')
    .min(8, 'Password is too short')
    .matches(PASSWORD_REGEX, 'Contain alphabetical / Special / number'),
};

export const signupValidationSchema = Yup.object({
  name: Yup.string()
    .trim('Name is required!')
    .min(2, 'Invalid Name')
    .required('Name is required!'),
  email: Yup.string()
    .trim('Email is required!')
    .email('Invalid Email')
    .required('Email is required!'),
  ...password,
});

export const signinValidationSchema = Yup.object({
  email: Yup.string()
    .trim('Email is required!')
    .email('Invalid Email')
    .required('Email is required!'),
  ...password,
});

export const forgotPasswordValidationSchema = Yup.object({
  email: Yup.string()
    .trim('Email is required!')
    .email('Invalid Email')
    .required('Email is required!'),
});
