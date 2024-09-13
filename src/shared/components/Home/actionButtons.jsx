'use client';
import React from 'react';

import PropTypes from 'prop-types';
import {useRouter} from 'next/navigation';

// MUI
import Grid from '@mui/material/Grid';
import Button from '../button';
import {AUTH_ROUTES, DASHBOARD_ROUTES} from '@/shared/constants/appRoutes';

// Redux
import {useSelector} from 'react-redux';
import {getCurrentUser} from '@/redux/slices/user';
import {getCurrentOrganization} from '@/shared/redux/slices/organization';
import {domainUrl} from '@/shared/utils/general';

export default function ActionButtons({
  checkInBtn,
  checkOutBtn,
  breakBtn,
  returnFromBreakBtn,
}) {
  const router = useRouter();

  const currentUser = useSelector(getCurrentUser);
  const currOrg = useSelector(getCurrentOrganization);
  const isLoggedIn = currentUser;

  console.log(currOrg);

  const subdomain = currOrg?.domain;

  const btnStyle = {
    color: 'var(--primary)',
    fontWeight: 'bold',
    py: 1.8,
    backgroundColor: '#fef4f1',
    borderColor: 'var(--primary)',
    '&:hover': {
      borderColor: 'var(--primary)',
      backgroundColor: '#fef4f1',
    },
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <Button
          type={'submit'}
          btnText={'Check In'}
          variant="outlined"
          sx={{
            color: '#fff',
            fontWeight: btnStyle.fontWeight,
            py: btnStyle.py,
            backgroundColor: 'var(--primary)',
            borderColor: 'var(--primary)',
            '&:hover': {
              borderColor: 'var(--primary)',
              backgroundColor: 'var(--primary)',
            },
          }}
          disabled={checkInBtn.disabled}
        />
      </Grid>
      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <Button
          type={'button'}
          btnText={checkOutBtn.btnText}
          onClick={checkOutBtn.onClick}
          variant="outlined"
          sx={btnStyle}
          disabled={checkOutBtn.disabled}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <Button
          type={'button'}
          btnText={'Leave on Break'}
          onClick={breakBtn.onClick}
          variant="outlined"
          sx={btnStyle}
          disabled={breakBtn.disabled}
        />
      </Grid>

      <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
        <Button
          type={'button'}
          btnText={'Return from Break'}
          onClick={returnFromBreakBtn.onClick}
          variant="outlined"
          sx={btnStyle}
          disabled={returnFromBreakBtn.disabled}
        />
      </Grid>
      <Grid item xs={12} md={12} lg={12} xl={12}>
        <Button
          type={'button'}
          btnText={'Log In to Dashboard'}
          onClick={() =>
            router.push(
              isLoggedIn
                ? `${domainUrl({subDomain: subdomain})}${DASHBOARD_ROUTES.home}`
                : `${domainUrl()}${AUTH_ROUTES.login}`
            )
          }
          sx={{
            backgroundColor: 'var(--accent)',
            fontWeight: 'bold',
            textTransform: 'none',
            fontSize: '14px',
            py: 1.7,
            '&:hover': {
              backgroundColor: 'var(--accent)',
            },
          }}
        />
      </Grid>
    </Grid>
  );
}

ActionButtons.propTypes = {
  checkInBtn: PropTypes.object.isRequired,
  checkOutBtn: PropTypes.object.isRequired,
  breakBtn: PropTypes.object.isRequired,
  returnFromBreakBtn: PropTypes.object.isRequired,
};
