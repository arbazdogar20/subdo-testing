'use client';

import {Fragment, useEffect} from 'react';

// Components
import OrganizationConfiguration from '@/shared/components/dashboard/manager/configurations/organizationConfiguration';
import TimeTrackingConfiguration from '@/shared/components/dashboard/manager/configurations/timeTrackingConfiguration';

// Constants
import {trackingModes} from '@/shared/constants/timeTrackingConstant';

// Redux
import {useSelector, useDispatch} from 'react-redux';
import {getCurrentOrganization} from '@/redux/slices/organization';
import {verifyActivatedTracking} from '@/shared/redux/slices/timeTracking';

export default function ConfigurationPage() {
  const currentOrg = useSelector(getCurrentOrganization);
  const orgTrackingMode = currentOrg?.trackingMode;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyActivatedTracking());
  }, []);

  return (
    <Fragment>
      <OrganizationConfiguration />
      {orgTrackingMode !== trackingModes.flexible.value && (
        <TimeTrackingConfiguration />
      )}
    </Fragment>
  );
}
