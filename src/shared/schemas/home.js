import * as Yup from 'yup';

export const timeTracker = Yup.object().shape({
  departmentId: Yup.object()
    .typeError('Department is required')
    .required('Department is required'),
  employeeId: Yup.string().required('Employee Id is required'),
});
