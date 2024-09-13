import * as Yup from 'yup';

import {trackingModes} from '@/constants/timeTrackingConstant';

export const organizationConfigurationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, 'At least 3 characters')
    .max(255)
    .required('Name is required')
    .label('Name'),
  cutOffTime: Yup.string().required('Time is required').label('Time'),
  trackingMode: Yup.string()
    .oneOf(Object.keys(trackingModes))
    .required('Tracking mode is required'),
});
