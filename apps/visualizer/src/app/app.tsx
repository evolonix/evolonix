import { Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Breadcrumbs from '../components/breadcrumbs';
import Header from '../components/header';

export function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen flex-col supports-[-webkit-touch-callout:none]:min-h-[-webkit-fill-available]">
      <Header />

      <main className="flex flex-1 flex-col px-4 pb-8 pt-4 sm:px-6 lg:px-8">
        <Breadcrumbs className="hidden lg:flex" />

        <Outlet />
      </main>

      <footer className="grid h-20 place-items-center bg-slate-50 ring-1 ring-slate-200 dark:bg-slate-900 dark:ring-slate-800">
        <p className="text-sm">
          Copyright &copy; {new Date().getFullYear()} Evolonix. All rights
          reserved.
        </p>
      </footer>

      {/* Scroll to Top */}
      <Transition
        show={scrolled}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
      >
        <button
          type="button"
          className="fixed bottom-16 right-0 inline-flex scale-150 items-center rounded-md rounded-r-none bg-sky-600 p-1.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 dark:shadow-black lg:px-2.5"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span className="sr-only">Scroll to Top</span>
          <ChevronUpIcon className="-ml-1 h-5 w-5" />
        </button>
      </Transition>
    </div>
  );
}

export default App;
