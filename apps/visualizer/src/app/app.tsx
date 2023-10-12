import { Outlet } from 'react-router-dom';
import { Nav } from '../components/nav';

export function App() {
  return (
    <div className="flex min-h-screen flex-col supports-[-webkit-touch-callout:none]:min-h-[-webkit-fill-available]">
      <header className="sticky top-0 z-20 flex h-14 items-center bg-white px-4 ring-1 ring-slate-200 dark:bg-slate-950 dark:ring-slate-800 sm:px-6 lg:px-8">
        <Nav />
      </header>

      <main className="flex flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8">
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
