'use client';
import Box from '@mui/material/Box';
import Image from 'next/image';
import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

export default function GlobalLayout({children}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    if (typeof window !== 'undefined') {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <Box
          sx={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Image
            src={'/images/loader.svg'}
            width={80}
            height={80}
            alt="loader"
            priority="high"
          />
        </Box>
      ) : (
        children
      )}
    </>
  );
}

GlobalLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
