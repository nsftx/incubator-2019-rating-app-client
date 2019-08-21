<template>
  <div id="app">
    <v-snackbar
      v-model="snackbarError"
      :class="snackbarErr.type"
      top
      :timeout="2000"
    >
      {{ snackbarErr.text }}
    </v-snackbar>
    <div v-show="!clicked">
      <img
        class="thumb"
        src="./assets/positive-vote.png"
      >
      <p class="marg-btm">
        Rate our service!
      </p>
      <div>
        <v-btn
          v-for="(item, index) in emoticons"
          :key="item.id"
          :item="item"
          :index="index"
          @click="clickedReact(item.id)"
        >
          <i :class="item.symbol" />
          <p
            v-if="settings.emoticonsGroupId != 30"
            class="values"
          >
            {{ index + 1 }}
          </p>
        </v-btn>
      </div>
    </div>
    <div
      v-if="clicked"
      class="whole"
    >
      <img
        class="check"
        src="./assets/check.png"
      >
      <p>{{ settings.message.text }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clicked: false,
      snackbarError: false,
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
      return this.$store.getters.notifications;
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
.error .v-snack__content {
  background: red;
}
.success .v-snack__content {
  background: green;
}
.v-snack.v-snack--active.v-snack--top {
  background: none !important;
}
::-webkit-scrollbar {
  display: none;
}
</style>
