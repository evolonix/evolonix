import React from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { SidebarLayout } from '../components/catalyst';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';

const Home = React.lazy(() => import('../pages/home'));
const Search = React.lazy(() => import('../pages/search'));
const Inbox = React.lazy(() => import('../pages/inbox'));
const Settings = React.lazy(() => import('../pages/settings'));
const Support = React.lazy(() => import('../pages/support'));
const Changelog = React.lazy(() => import('../pages/changelog'));
const Profile = React.lazy(() => import('../pages/profile'));
const Privacy = React.lazy(() => import('../pages/privacy'));
const Feedback = React.lazy(() => import('../pages/feedback'));
const Logout = React.lazy(() => import('../pages/logout'));

export function App() {
  return (
    <SidebarLayout navbar={<Navbar />} sidebar={<Sidebar />}>
      <Routes>
        <Route path="/" errorElement={<div>Page Error</div>}>
          <Route index element={<Home />} />
          <Route path="search" element={<Search />} />
          <Route path="inbox" element={<Inbox />} />
          <Route path="settings" element={<Settings />} />
          <Route path="support" element={<Support />} />
          <Route path="changelog" element={<Changelog />} />
          <Route path="profile" element={<Profile />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path="logout" element={<Logout />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SidebarLayout>
  );
}

export default App;
