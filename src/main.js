import Vue from 'vue';
import './plugins/vuetify';
import VueAxios from 'vue-axios';
import Axios from 'axios';
import WebSocket from 'vue-native-websocket';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(WebSocket, 'wss://ratingsapp.ddns.net:7000', { store });

Vue.use(VueAxios, Axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
