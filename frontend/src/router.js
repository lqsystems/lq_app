import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'controls',
      component: () => import('@/views/Controls'),
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('@/views/Test'),
    },
  ],
});
