/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const API_URL = 'http://172.20.15.193:3000/api/v1';
export default new Vuex.Store({
  state: {
    settings: {},
    emoticons: [],
    snackbarErr: '',
  },
  mutations: {
    setSettings(state, value) {
      state.settings = value;
    },
    setEmoticons(state, value) {
      state.emoticons = value;
    },
    setSnackbar(state, value) {
      state.snackbarErr = value;
    },
  },
  getters: {
    settings: state => state.settings,
    emoticons: state => state.emoticons,
    snackbarErr: state => state.snackbarErr,
  },
  actions: {
    getActiveSettings({ commit }) {
      axios
        .get(`${API_URL}/settings/last`)
        .then(response => {
          commit('setSettings', response.data.data);
          commit('setEmoticons', response.data.emoticons);
        })
        .catch(err => {
          commit('setSnackbar', err.response.data.error);
        });
    },
    // eslint-disable-next-line no-empty-pattern
    postRating({}, rating) {
      axios.post(`${API_URL}/ratings`, rating);
    },
    notifyOnSettingsChange({ commit }) {
      // eslint-disable-next-line global-require
      const socket = require('socket.io-client')('http://172.20.15.193:7000');
      socket.on('newSettings', settings => {
        commit('setSettings', settings.data);
        commit('setEmoticons', settings.emoticons);
      });
    },
  },
});
