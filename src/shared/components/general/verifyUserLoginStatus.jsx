'use client';

import {fetchVerifyUserLoginStatus} from '@/shared/redux/slices/user';
import {useEffect} from 'react';

import {useDispatch} from 'react-redux';

export default function VerifyUserLoginStatus() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchVerifyUserLoginStatus());
  }, []);
  return null;
}
