import Vue from 'vue';
import './plugins/vuetify';
import VueAxios from 'vue-axios';
import Axios from 'axios';
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(VueAxios, Axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
