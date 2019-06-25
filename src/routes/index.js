import React from 'react';
import Bundle from '../components/bundle';

export default [
  {
    path: '/',
    exact: true,
    component(props) {
      return <Bundle {...props} load={() => import('../pages/home')} />;
    }
  },
  {
    path: '/about',
    component(props) {
      return <Bundle {...props} load={() => import('../pages/about')} />;
    }
  },
  {
    path: '/help',
    component(props) {
      return <Bundle {...props} load={() => import('../pages/help')} />;
    }
  }
];
