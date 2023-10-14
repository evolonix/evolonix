import { Outlet } from 'react-router-dom';
import Breadcrumbs from '../components/breadcrumbs';
import Header from '../components/header';

export function App() {
  return (
    <div className="flex min-h-screen flex-col supports-[-webkit-touch-callout:none]:min-h-[-webkit-fill-available]">
      <Header />

      <main className="flex flex-1 flex-col px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <Breadcrumbs />

        <Outlet />
      </main>

      <footer className="grid h-20 place-items-center bg-slate-50 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
        <p className="text-sm">
          Copyright &copy; {new Date().getFullYear()} Evolonix. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
