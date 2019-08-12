<template>
  <div id="app">
    <v-snackbar
      v-model="snackbarError"
      :bottom="y === 'bottom'"
      :color="color"
      :left="x === 'left'"
      :multi-line="mode === 'multi-line'"
      :right="x === 'right'"
      :timeout="timeout"
      :top="y === 'top'"
      :vertical="mode === 'vertical'"
    >
      Error: {{ snackbarErr }}
      <v-btn dark text @click="snackbarError = false">
        Close
      </v-btn>
    </v-snackbar>
    <div v-show="!clicked">
      <img class="thumb" src="./assets/positive-vote.png" />
      <p class="marg-btm">Rate our service!</p>
      <div>
        <v-btn
          v-for="(item, index) in emoticons"
          :item="item"
          :index="index"
          :key="item.id"
          @click="clickedReact(item.id)"
        >
          <i :class="item.symbol" />
          <p class="values" v-if="settings.emoticonsGroupId != 30">{{ index + 1 }}</p>
        </v-btn>
      </div>
    </div>
    <div class="whole" v-if="clicked">
      <img class="check" src="./assets/check.png" />
      <p>{{ settings.message.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clicked: false,
      color: '',
      mode: '',
      snackbarError: false,
      text: '',
      timeout: 4000,
      x: null,
      y: 'top',
    };
  },
  computed: {
    settings() {
      return this.$store.getters.settings;
    },
    emoticons() {
      return this.$store.getters.emoticons;
    },
    snackbarErr() {
      return this.$store.getters.snackbarErr;
    },
  },
  watch: {
    snackbarErr() {
      this.snackbarError = true;
    },
  },
  created() {
    this.$store.dispatch('getActiveSettings');
    this.$store.dispatch('notifyOnSettingsChange');
  },
  methods: {
    clickedReact(react) {
      this.clicked = true;
      const rating = {
        emoticonId: react,
      };
      setTimeout(this.goBack, this.settings.messageTimeout * 1000);
      this.$store.dispatch('postRating', rating);
    },
    goBack() {
      this.clicked = false;
    },
  },
};
</script>

<style lang="less">
.marg-btm {
  margin-bottom: 30px;
}
button.v-btn.theme--dark {
  background: #353535 !important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  background: rgb(36, 40, 46);
}
.thumb {
  margin-bottom: 3%;
  height: 170px;
  width: auto;
}
p {
  color: rgb(214, 214, 214);
  font-size: 28px;
}
button.v-btn.theme--light {
  height: 55px;
  width: 125px;
  font-size: 20px;
}
.values {
  margin-top: 13px;
  color: black;
  font-size: 24px;
  margin-left: 3px;
}
.whole {
  height: 100%;
  width: 100%;
  cursor: pointer;
}
.check {
  margin-bottom: 5%;
}
</style>
