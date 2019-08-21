import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const API_URL = 'http://172.20.15.193:3000/api/v1';
export default new Vuex.Store({
  state: {
    settings: {},
    emoticons: [],
  },
  getters: {
    settings: state => state.settings,
    emoticons: state => state.emoticons,
  },
  mutations: {
    setSettings(state, settings) {
      state.settings = settings;
    },
    setEmoticons(state, emoticons) {
      state.emoticons = emoticons;
    },
  },
  actions: {
    getActiveSettings({ commit }) {
      axios.get(`${API_URL}/settings/last`).then(response => {
        commit('setSettings', response.data.data);
        commit('setEmoticons', response.data.emoticons);
      });
    },
    postRating({}, rating) {
      axios.post(`${API_URL}/ratings`, rating);
    },
    notifyOnSettingsChange({ commit }) {
      const socket = require('socket.io-client')('http://172.20.15.193:7000/');
      socket.on('newSettings', (settings) => {
        commit('setSettings', settings.data);
        commit('setEmoticons', settings.emoticons);
      });
    },
  },
});
