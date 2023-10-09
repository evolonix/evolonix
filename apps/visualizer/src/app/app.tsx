import { Outlet, useLoaderData } from 'react-router-dom';
import { Nav } from '../components/nav';
import { Preview } from '../data/preview.model';

export async function loader() {
  const previews = await import('../../previews/previews').then(
    (m) => m.default
  );

  return { previews };
}

export function App() {
  const { previews } = useLoaderData() as { previews: Preview[] };

  return (
    <div className="flex min-h-screen flex-col supports-[-webkit-touch-callout:none]:min-h-[-webkit-fill-available]">
      <header className="sticky top-0 z-20 flex h-14 items-center bg-white px-4 ring-1 ring-gray-200 sm:px-6 lg:px-8">
        <Nav previews={previews} />
      </header>

      <main className="flex flex-1 flex-col py-8 px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>

      <footer className="grid h-20 place-items-center bg-gray-100 ring-1 ring-gray-200">
        <p className="text-sm">
          Copyright &copy; {new Date().getFullYear()} Evolonix. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
