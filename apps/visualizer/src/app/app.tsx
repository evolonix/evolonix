import { Outlet } from 'react-router-dom';
import { Nav } from '../components/nav';

export function App() {
  return (
    <div className="flex min-h-screen flex-col supports-[-webkit-touch-callout:none]:min-h-[-webkit-fill-available]">
      <header className="sticky top-0 z-20 flex h-14 items-center bg-white px-4 ring-1 ring-gray-200 dark:bg-black dark:ring-gray-800 sm:px-6 lg:px-8">
        <Nav />
      </header>

      <main className="flex flex-1 flex-col py-8 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="dark:bg-gray-950 grid h-20 place-items-center bg-gray-100 ring-1 ring-gray-200 dark:ring-gray-800">
        <p className="text-sm">
          Copyright &copy; {new Date().getFullYear()} Evolonix. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
