import * as Yup from 'yup';
import {trackingModes} from '@/constants/timeTrackingConstant';

const commonFieldsSchema = {
  firstName: Yup.string()
    .min(3, 'At least 3 characters')
    .max(50)
    .required('First name is required'),
  lastName: Yup.string()
    .min(3, 'At least 3 characters')
    .max(50)
    .required('Last name is required'),
  email: Yup.string()
    .required('Email is required')
    .test('email', 'Email is not valid', (value) => {
      // This custom regex test enhances email validation to address limitations in the default Yup validation, which fails to catch certain invalid email formats like "test@test" or "test@test.c".
      return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value);
    }),
  password: Yup.string()
    .required('Password is required')
    .min(
      8,
      'Must contain at least 8 characters and at least 1 uppercase letter'
    )
    .matches(
      /[A-Z]/,
      'Must contain at least 8 characters and at least 1 uppercase letter'
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
};

export const loginUserSchema = Yup.object().shape({
  email: commonFieldsSchema.email,
  password: Yup.string().required('Password is required'),
});

export const registerManagerSchema = Yup.object().shape({
  firstName: commonFieldsSchema.firstName,
  lastName: commonFieldsSchema.lastName,
  password: commonFieldsSchema.password,
  confirmPassword: commonFieldsSchema.confirmPassword,
  organizationName: Yup.string()
    .max(200, 'Organization name must be less than 200 characters')
    .required('Organization name is required'),
  timezone: Yup.object()
    .typeError('Timezone is required')
    .required('Timezone is required'),
  trackingMode: Yup.string()
    .oneOf(Object.keys(trackingModes))
    .required('Tracking mode is required'),
  domain: Yup.string()
    .required('Subdomain is required')
    .test(
      'subdomain',
      'Subdomain is not valid its should be like xyz, x-y-z or xyz-1',
      (value) => {
        const regex = /^[a-z0-9]+(-[a-z0-9]+)*$/;
        return regex.test(value);
      }
    ),
});

export const sendResetPasswordLinkSchema = Yup.object().shape({
  email: commonFieldsSchema.email,
});

export const resetPasswordSchema = Yup.object().shape({
  password: commonFieldsSchema.password,
  confirmPassword: commonFieldsSchema.confirmPassword,
});

export const inviteManagerSchema = Yup.object().shape({
  firstName: commonFieldsSchema.firstName,
  lastName: commonFieldsSchema.lastName,
  email: commonFieldsSchema.email,
});

export const addEmployeeSchema = Yup.object().shape({
  firstName: commonFieldsSchema.firstName,
  lastName: commonFieldsSchema.lastName,
  email: commonFieldsSchema.email,
  employeeId: Yup.string().required('Employee id is required'),
  positionId: Yup.object()
    .typeError('Position is required')
    .required('Position is required'),
  rate: Yup.string(),
});
