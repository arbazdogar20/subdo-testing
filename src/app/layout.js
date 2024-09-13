import './globals.css';

import PropTypes from 'prop-types';
import {Raleway} from 'next/font/google';
import {Toaster} from 'react-hot-toast';
import {Providers} from '@/shared/redux/provider';

import {appInfo} from '@/shared/constants/appRoutes';
import AuthGuard from '@/shared/components/auth/authGuard';

const inter = Raleway({subsets: ['latin']});

export const metadata = {
  title: appInfo.title,
  description: appInfo.description,
};

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <AuthGuard>{children}</AuthGuard>
        </Providers>
        <Toaster
          position={'top-right'}
          toastOptions={{className: 'react-hot-toast'}}
        />
      </body>
    </html>
  );
}

RootLayout.propTypes = {
  children: PropTypes.node,
};
