import * as yup from 'yup';

export const addPositionSchema = yup.object().shape({
  name: yup.string().required('Position name is required'),
});
