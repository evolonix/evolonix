import React from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { AuthLayout } from '../components/catalyst';

const Login = React.lazy(() => import('../pages/login'));
const Register = React.lazy(() => import('../pages/register'));
const ForgotPassword = React.lazy(() => import('../pages/forgot-password'));
const Logout = React.lazy(() => import('../pages/logout'));

export function Auth() {
  return (
    <AuthLayout>
      <Routes>
        <Route path="/" errorElement={<div>Page Error</div>}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthLayout>
  );
}

export default Auth;
