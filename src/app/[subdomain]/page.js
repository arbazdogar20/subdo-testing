import {getSubdomainLink} from '@/shared/utils/general';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage({params}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <h1>HomePage {params.subdomain}</h1>

      <div>
        <Link href={getSubdomainLink('/home')}>
          <Image
            src="https://nextjs.org/icons/vercel.svg"
            alt="Vercel logomark"
            width={20}
            height={20}
          />
          Go To subdomain
        </Link>
      </div>
    </div>
  );
}
