import { CustomNavbar, CustomSidebar, SidebarLayout } from '@evolonix/ui';
import { Outlet } from 'react-router';

export function App() {
  return (
    <SidebarLayout navbar={<CustomNavbar />} sidebar={<CustomSidebar />}>
      <Outlet />
    </SidebarLayout>
  );
}

export default App;
