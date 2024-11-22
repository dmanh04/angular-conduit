export interface Menu {
  url: string;
  title: string;
  isAuth?: boolean;
}
export const MENU: Menu[] = [
  {
    url: '/',
    title: 'Home',
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
  {
    url: '/setting',
    title: 'Setting',
    isAuth: true,
  },
];
