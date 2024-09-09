import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./home/home.component').then(c => c.HomeComponent),
        title: 'Home',
    },
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(c => c.LoginComponent),
        title: 'Sign in - Conduit'
    },
    {
        path: 'register',
        loadComponent: () => import('./register/register.component').then(c => c.RegisterComponent),
        title: 'Sign up - Conduit'
    }
    

];
