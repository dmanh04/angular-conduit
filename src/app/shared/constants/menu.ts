export interface Menu {
  url: string;
  title: string;
  // isAuth: boolean;
}
export const MENU_NON_AUTH: Menu[] = [
  {
    url: '/',
    title: 'Home',
  },
  {
    url: '/login',
    title: 'Sign in',
  },
  {
    url: '/register',
    title: 'Sign up',
  },
];

export const MENU_AUTH: Menu[] = [
  {
    url: '/',
    title: 'Home',
  },
  {
    url: '/editor',
    title: 'New article',
  },
];
