import {
  type RouteConfig,
  index,
  layout,
  prefix,
  route,
} from '@react-router/dev/routes';

export default [
  layout('./app.tsx', [
    index('./routes/home.tsx'),
    route('search', './routes/search.tsx'),
    route('inbox', './routes/inbox.tsx'),
    route('support', './routes/support.tsx'),
    route('changelog', './routes/changelog.tsx'),
    route('profile', './routes/profile.tsx'),
    route('settings', './routes/settings.tsx'),
    route('privacy', './routes/privacy.tsx'),
    route('feedback', './routes/feedback.tsx'),
    ...prefix('rick-and-morty', [
      index('./routes/rick-and-morty/dashboard.tsx'),
      route('characters/:id?', './routes/rick-and-morty/character.tsx'),
    ]),
    ...prefix('admin', [
      route('settings', './routes/admin/settings.tsx'),
      ...prefix('rick-and-morty', [
        route(
          'characters/:id?/edit?',
          './routes/admin/rick-and-morty/characters.tsx',
        ),
        route(
          'episodes/:id?/edit?',
          './routes/admin/rick-and-morty/episodes.tsx',
        ),
        route(
          'locations/:id?/edit?',
          './routes/admin/rick-and-morty/locations.tsx',
        ),
      ]),
    ]),
    ...prefix('cdk', [route('grid-layout', './routes/cdk/grid-layout.tsx')]),
  ]),
  layout('./auth.tsx', [
    route('login', './routes/login.tsx'),
    route('register', './routes/register.tsx'),
    route('forgot-password', './routes/forgot-password.tsx'),
    route('logout', './routes/logout.tsx'),
  ]),
] satisfies RouteConfig;
