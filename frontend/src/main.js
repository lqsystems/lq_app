import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import store from '@/store';
import router from './router';
import App from './App.vue';
import './plugins/vuetify';
import './styles/icons/style.css';
import './styles/index.scss';
// import './registerServiceWorker';

if (process.env.NODE_ENV === 'production') {
  console.log('location info:', window.location);
}

Vue.use(
  new VueSocketIO({ connection: 'http://25.81.56.126:8888/data' }),
  // new VueSocketIO({ connection: `${window.location.hostname}:8888/data` }),
);


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
