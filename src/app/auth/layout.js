import Logo from '@/shared/components/logo';

export default function AuthLayout({children}) {
  return (
    <div>
      <Logo />
      {children}
    </div>
  );
}
