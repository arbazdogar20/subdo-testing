'use client';
import {useRouter} from 'next/navigation';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Button from '@/shared/components/button';
import {domainUrl} from '@/shared/utils/general';

export default function NotFound() {
  const router = useRouter();
  return (
    <Box>
      <Image
        src={`${domainUrl()}/images/logo.png`}
        alt="logo"
        width={185}
        height={100}
        priority
        style={{marginLeft: '5px', marginTop: '5px'}}
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="75vh"
        flexDirection="column"
      >
        <Image
          src={`${domainUrl()}/images/not-found.svg`}
          alt="not found"
          width={350}
          height={350}
          priority
        />
        <Button
          btnText="Go Home"
          variant="outlined"
          onClick={() => {
            router.push(`${domainUrl()}/auth/login`);
          }}
          sx={{
            maxWidth: '200px',
            color: 'var(--secondary)',
            borderColor: 'var(--secondary)',
          }}
        />
      </Box>
    </Box>
  );
}
