import Vue from 'vue'
import App from './App.vue'
import router from './router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueSocketIO from 'vue-socket.io';
import SocketIO from 'socket.io-client';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import store from './store';

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);

const socketConnection = SocketIO('http://rent-a-car-rest.herokuapp.com');

Vue.use(new VueSocketIO({
  debug: true,
  connection: socketConnection,
  vuex: {
      store,
      actionPrefix: 'socket_',
  }
}));

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
