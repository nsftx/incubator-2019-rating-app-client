/* eslint-disable no-param-reassign */
import axios from 'axios';
import messages from './notifications';

const API_URL = 'https://ratingsapp.ddns.net:3000/api/v1';

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
    SOCKET_ONMESSAGE(state, message) {
      const settings = JSON.parse(message.data);
      if (settings.type === 'settings') {
        messages.state.notifications = { type: 'success', text: 'Settings updated' };
        state.activeSettings = settings.data;
        state.emoticons = settings.emoticons;
      }
    },
  },
  getters: {
    settings: state => state.activeSettings,
    emoticons: state => state.emoticons,
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
  },
});
