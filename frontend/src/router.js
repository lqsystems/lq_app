import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'reactor',
      component: () => import('@/views/Reactor'),
    },
    {
      path: '/reactor-controls',
      name: 'reactorControls',
      component: () => import('@/views/ReactorControls'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/Test'),
    },
  ],
});
