import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login'),
    },
    {
      path: '/',
      name: 'reactorControls',
      component: () => import('@/views/ReactorControls'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/Test'),
    },
    {
      path: '*',
      name: 'reroute',
      component: () => import('@/views/Login'),
    },
  ],
});
