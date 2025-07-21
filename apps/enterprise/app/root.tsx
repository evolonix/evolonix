import ReactGA from 'react-ga4';
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  type LinksFunction,
  type MetaFunction,
} from 'react-router';

import {
  FeatureFlagProvider,
  FeatureFlags,
  FeatureFlagToggleDialog,
} from '@evolonix/feature-flags-feature';

import '../styles.css';
import { buildInjector } from './injector';

buildInjector();

export const meta: MetaFunction = () => [
  {
    title: 'Enterprise',
  },
];

export const links: LinksFunction = () => [
  {
    rel: 'icon',
    href: '/favicon.ico',
    sizes: '32x32',
  },
  // <!-- icon: 512x512 -->
  {
    rel: 'icon',
    href: '/icon.svg',
    type: 'image/svg+xml',
  },
  // <!-- apple-touch-icon: 180×180 -->
  {
    rel: 'apple-touch-icon',
    href: '/apple-touch-icon.png',
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className="bg-white lg:bg-zinc-100 dark:bg-zinc-900 dark:lg:bg-zinc-950"
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="text-zinc-950 antialiased dark:text-white">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const measurementId = import.meta.env.VITE_GOOGLE_ANALYTICS_MEASUREMENT_ID;
  if (measurementId) ReactGA.initialize(measurementId);

  const initialFlags: FeatureFlags = {};

  return (
    <FeatureFlagProvider
      flagsmithEnvironmentId={import.meta.env.VITE_FLAGSMITH_ENVIRONMENT_ID}
      initialFlags={initialFlags}
    >
      <Outlet />

      <FeatureFlagToggleDialog />
    </FeatureFlagProvider>
  );
}
