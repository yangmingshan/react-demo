import { lazy } from 'react';

export default [
  {
    path: '/',
    exact: true,
    component: lazy(() => import('../pages/home'))
  },
  {
    path: '/about',
    component: lazy(() => import('../pages/about'))
  },
  {
    path: '/help',
    component: lazy(() => import('../pages/help'))
  }
];
