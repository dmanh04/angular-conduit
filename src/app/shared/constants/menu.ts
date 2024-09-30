export interface Menu {
  url: string;
  title: string;
  isAuth: boolean;
}
export const MENU: Menu[] = [
  {
    url: '/',
    title: 'Home',
    isAuth: false,
  },
  {
    url: '/login',
    title: 'Sign in',
    isAuth: false,
  },
  {
    url: '/register',
    title: 'Sign up',
    isAuth: false,
  },
  {
    url: '/editor',
    title: 'New article',
    isAuth: true,
  },
];
