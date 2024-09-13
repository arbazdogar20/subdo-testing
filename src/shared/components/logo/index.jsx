import Image from 'next/image';
import Link from 'next/link';
import styles from './styles.module.css';
import {domainUrl} from '@/shared/utils/general';
import PropTypes from 'prop-types';

export default function Logo({href = '/'} = {}) {
  return (
    <div className={styles.logo}>
      <Link href={href}>
        <Image
          src={`${domainUrl()}/images/logo.png`}
          alt="logo"
          width={185}
          height={100}
          className={styles.logoImg}
          priority
        />
      </Link>
    </div>
  );
}

Logo.propTypes = {
  href: PropTypes.string,
};
