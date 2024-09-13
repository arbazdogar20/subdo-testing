import * as Yup from 'yup';

export const addDepartmentSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'At least 3 characters')
    .max(255)
    .required('Department name is required'),
});
