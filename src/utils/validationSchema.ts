import * as Yup from 'yup';

import { EMAIL_REGEX, PASSWORD_REGEX } from 'src/constants';
import { categories } from './categories';

type ValidationResult<T> = { error?: string; values?: T };

export const yupValidate = async <T extends object>(
  schema: Yup.Schema,
  value: T
): Promise<ValidationResult<T>> => {
  try {
    const data = await schema.validate(value);
    return { values: data };
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      return { error: error?.message };
    } else {
      return { error: (error as any)?.message };
    }
  }
};

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

export const newProductValidationSchema = Yup.object({
  name: Yup.string().required('Name is required!'),
  description: Yup.string().required('description is required!'),
  category: Yup.string()
    .oneOf(
      categories.map((el) => el.value),
      'Invalid category'
    )
    .required('Category is required!'),
  price: Yup.number().positive().required('price is required!'),
  purchasingDate: Yup.date().required('Purchasing date is required'),
});

export const updateProductValidationSchema = Yup.object({
  name: Yup.string().required('Name is required!'),
  description: Yup.string().required('description is required!'),
  category: Yup.string()
    .oneOf(
      categories.map((el) => el.value),
      'Invalid category'
    )
    .required('Category is required!'),
  price: Yup.number().positive().required('price is required!'),
  date: Yup.date().required('Purchasing date is required'),
});
