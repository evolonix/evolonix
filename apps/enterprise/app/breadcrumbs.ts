import { BreadcrumbMap } from '@evolonix/ui';

export const breadcrumbMap: BreadcrumbMap = {
  '/': 'Home',
  '/search': 'Search',
  '/inbox': 'Inbox',
  '/support': 'Support',
  '/changelog': 'Changelog',
  '/profile': 'Profile',
  '/settings': 'Settings',
  '/privacy': 'Privacy',
  '/feedback': 'Feedback',

  '/rick-and-morty': 'Rick and Morty',
  '/rick-and-morty/characters': 'Characters',
  '/rick-and-morty/characters/:id': ({ id }) => `Character ${id}`,

  '/admin': 'Admin',
  '/admin/settings': 'Admin Settings',
  '/admin/rick-and-morty/characters': 'Edit Characters',
  '/admin/rick-and-morty/characters/:id/edit': ({ id }) =>
    `Edit Character ${id}`,
  '/admin/rick-and-morty/episodes/:id/edit': ({ id }) => `Edit Episode ${id}`,
  '/admin/rick-and-morty/locations/:id/edit': ({ id }) => `Edit Location ${id}`,

  '/cdk/grid-layout': 'Grid Layout',

  '/login': 'Login',
  '/register': 'Register',
  '/forgot-password': 'Forgot Password',
  '/logout': 'Logout',
};
