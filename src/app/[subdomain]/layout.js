'use client';
import {useEffect, useState, Fragment} from 'react';
import PropTypes from 'prop-types';
import {notFound} from 'next/navigation';
import {useDispatch} from 'react-redux';
import {findOrganizationByDomain} from '@/shared/redux/slices/organization';
import Image from 'next/image';
import Box from '@mui/material/Box';
import {domainUrl} from '@/shared/utils/general';
import {fetchVerifyUserLoginStatus} from '@/shared/redux/slices/user';

export default function SubdomainLayout({children, params}) {
  const subdomain = params.subdomain;
  const dispatch = useDispatch();

  const [isValidSubdomain, setIsValidSubdomain] = useState(true);
  const [isFetching, setIsFetching] = useState(true);

  const fetchOrganization = async () => {
    const res = await dispatch(findOrganizationByDomain({domain: subdomain}));
    await dispatch(fetchVerifyUserLoginStatus());
    if (!res) setIsValidSubdomain(false);
    setIsFetching(false);
  };

  useEffect(() => {
    fetchOrganization();
  }, [subdomain]);

  if (!isValidSubdomain) notFound();

  return (
    <Fragment>
      {isFetching ? (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Image
            src={`${domainUrl()}/images/loader.svg`}
            alt="loading"
            width={80}
            height={80}
          />
        </Box>
      ) : (
        children
      )}
    </Fragment>
  );
}

SubdomainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  params: PropTypes.object.isRequired,
};
