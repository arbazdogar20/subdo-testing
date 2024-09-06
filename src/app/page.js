import Image from 'next/image';
import styles from './page.module.css';
import Link from 'next/link';
import {getSubdomainLink} from '@/shared/utils/general';

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <Image
          className={styles.logo}
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <ol>
          <li>
            Get started by editing <code>src/app/page.js</code>.
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>

        <div className={styles.ctas}>
          <Link href={getSubdomainLink('/home')} className={styles.primary}>
            <Image
              className={styles.logo}
              src="https://nextjs.org/icons/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            Go To subdomain
          </Link>
        </div>
      </main>
    </div>
  );
}
