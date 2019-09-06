import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';
import store from '@/store';
import router from './router';
import App from './App.vue';
import './plugins/vuetify';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import './styles/icons/style.css';
import './styles/index.scss';
// import './registerServiceWorker';

import { SENSOR_DATA_SOCKET_URL } from '@/constants/api.constants';

if (process.env.NODE_ENV === 'production') {
  console.log('location info:', window.location);
}
Vue.use(new VueSocketIO({ connection: SENSOR_DATA_SOCKET_URL }));
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
