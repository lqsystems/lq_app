import Vue from 'vue';
import VueSocketIO from 'vue-socket.io';

import store from '@/store';
import router from './router';
import App from './App.vue';
import './plugins/vuetify';
import './registerServiceWorker';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import './styles/icons/style.css';

Vue.use(new VueSocketIO({ connection: 'http://25.72.227.165:8888/data' }));
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
