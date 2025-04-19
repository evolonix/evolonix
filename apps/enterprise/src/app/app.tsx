import React from 'react';
import { Navigate, Route, Routes } from 'react-router';

import { SidebarLayout } from '../components/catalyst';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';

const Home = React.lazy(() => import('../pages/home'));
const Settings = React.lazy(() => import('../pages/settings'));

export function App() {
  return (
    <SidebarLayout navbar={<Navbar />} sidebar={<Sidebar />}>
      <Routes>
        <Route path="/" errorElement={<div>Page Error</div>}>
          <Route index element={<Home />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </SidebarLayout>
  );
}

export default App;
