'use client';

import Link from 'next/link';
import style from './style.module.css';
import {usePathname} from 'next/navigation';
import PropTypes from 'prop-types';

import {sideBarLinks} from '@/shared/constants/siderBarLinks';
import {getCurrentUser} from '@/shared/redux/slices/user';
import {useSelector} from 'react-redux';
import Image from 'next/image';

export default function Sidebar({onClick}) {
  const pathname = usePathname();
  const currentUser = useSelector(getCurrentUser);

  return (
    <div className={style.container}>
      <Link href={'/'}>
        <Image
          style={{marginLeft: '5px', width: 'auto', marginTop: '5px'}}
          src="/images/dash_logo.png"
          width={130}
          height={85}
          alt="dash_logo.png"
        />
      </Link>
      <hr />

      <div
        style={{
          overflowY: 'auto',
          marginTop: '10px',
        }}
      >
        {sideBarLinks({currentUserRole: currentUser?.systemRole}).map(
          (item) => {
            const isActive = pathname === item.link;
            const iconName = item?.icon?.split('/')[3];
            return (
              <Link
                href={item.link}
                key={item.id}
                className={style.linkStyle}
                onClick={onClick}
              >
                <div
                  className={`${style.nameAndIconsWrapper} ${
                    isActive ? style.active : ''
                  }`}
                >
                  <Image
                    src={item.icon}
                    height={20}
                    width={20}
                    alt={`${iconName}`}
                  />
                  {item.title}
                </div>
                <div
                  className={style.borderSideColor}
                  style={{display: isActive ? 'block' : 'none'}}
                ></div>
              </Link>
            );
          }
        )}
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  onClick: PropTypes.func,
};
