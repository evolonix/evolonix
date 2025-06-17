import React from 'react';
import { Navigate, Route, Routes, ScrollRestoration } from 'react-router';

import {
  AuthLayout,
  CustomNavbar,
  CustomSidebar,
  // EventLogger,
  SidebarLayout,
} from '@evolonix/ui';

// Main pages
const Home = React.lazy(() => import('../pages/home'));
const Search = React.lazy(() => import('../pages/search'));
const Inbox = React.lazy(() => import('../pages/inbox'));
const Support = React.lazy(() => import('../pages/support'));
const Changelog = React.lazy(() => import('../pages/changelog'));

// Rick & Morty pages
const RickAndMorty = React.lazy(
  () => import('../pages/rick-and-morty/rick-and-morty'),
);
const RickAndMortyCharacters = React.lazy(
  () => import('@evolonix/rick-and-morty-characters-feature'),
);

// User pages
const Profile = React.lazy(() => import('../pages/profile'));
const Settings = React.lazy(() => import('../pages/settings'));
const Privacy = React.lazy(() => import('../pages/privacy'));
const Feedback = React.lazy(() => import('../pages/feedback'));

// CDK pages
const GridLayout = React.lazy(() => import('../pages/grid-layout'));

// Admin pages
const AdminSettings = React.lazy(() => import('../pages/admin/settings'));

// Auth pages
const Login = React.lazy(() => import('../pages/login'));
const Register = React.lazy(() => import('../pages/register'));
const ForgotPassword = React.lazy(() => import('../pages/forgot-password'));
const Logout = React.lazy(() => import('../pages/logout'));

export function App() {
  return (
    <>
      <ScrollRestoration />

      <Routes>
        <Route path="/" errorElement={<div>Page Error</div>}>
          <Route
            element={
              <SidebarLayout
                navbar={<CustomNavbar />}
                sidebar={<CustomSidebar />}
              />
            }
          >
            {/* Main pages */}
            <Route index element={<Home />} />
            <Route path="search" element={<Search />} />
            <Route path="inbox" element={<Inbox />} />
            <Route path="support" element={<Support />} />
            <Route path="changelog" element={<Changelog />} />
            {/* Rick & Morty pages */}
            <Route path="rick-and-morty">
              <Route index element={<RickAndMorty />} />
              <Route
                path="characters/:id?"
                element={<RickAndMortyCharacters />}
              />
            </Route>
            {/* User pages */}
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
            <Route path="privacy" element={<Privacy />} />
            <Route path="feedback" element={<Feedback />} />
            {/* Admin pages */}
            <Route path="admin">
              <Route path="settings" element={<AdminSettings />} />
            </Route>
            {/* CDK pages */}
            <Route path="cdk">
              <Route path="grid-layout" element={<GridLayout />} />
            </Route>
          </Route>
          {/* Auth pages */}
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="logout" element={<Logout />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      {/* <EventLogger /> */}
    </>
  );
}

export default App;
