/* eslint-disable no-param-reassign */
import axios from 'axios';

const API_URL = 'http://172.105.81.4:4000/api/v1';
export default ({
  state: {
    activeSettings: {},
    emoticons: [],
  },
  mutations: {
    setSettings(state, value) {
      state.activeSettings = value;
    },
    setEmoticons(state, value) {
      state.emoticons = value;
    },
  },
  getters: {
    settings: (state) => state.activeSettings,
    emoticons: (state) => state.emoticons,
  },
  actions: {
    getActiveSettings({ commit }) {
      axios.get(`${API_URL}/settings/last`)
        .then((response) => {
          commit('setSettings', response.data.data);
          commit('setEmoticons', response.data.emoticons);
        })
        .catch((err) => {
          commit('setMessage', { type: 'error', text: err.message });
        });
    },
    // eslint-disable-next-line no-empty-pattern
    postRating({}, rating) {
      axios.post(`${API_URL}/ratings`, rating);
    },
    notifyOnSettingsChange({ commit }) {
      // eslint-disable-next-line global-require
      const socket = require('socket.io-client')('http://172.105.81.4:7000');
      socket.on('newSettings', (settings) => {
        commit('setSettings', settings.data);
        commit('setEmoticons', settings.emoticons);
        commit('setMessage', { type: 'success', text: 'Settings updated' });
      });
    },
  },
});