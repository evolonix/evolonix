import { Navigate, Route, Routes } from 'react-router';

import { Heading, SidebarLayout } from '../components/catalyst';
import { Navbar } from '../components/navbar';
import { Sidebar } from '../components/sidebar';

export function App() {
  return (
    <SidebarLayout navbar={<Navbar />} sidebar={<Sidebar />}>
      <Routes>
        <Route path="/" errorElement={<div>Page Error</div>}>
          <Route
            index
            element={
              <div>
                <Heading level={1}>Home</Heading>
              </div>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </SidebarLayout>
  );
}

export default App;
