import { AuthLayout } from '@evolonix/ui';
import { Outlet } from 'react-router';

export function Auth() {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
}

export default Auth;
