/* eslint-disable prefer-destructuring */
/* eslint-disable no-tabs */
import Vue from 'vue';
import Vuex from 'vuex';
import settings from './modules/settings';
import notifications from './modules/notifications';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    settings,
    notifications,
  },
});
