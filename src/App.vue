<template>
  <div id="app">
    <v-snackbar
      v-model="snackbar"
      :class="snackbarMsg.type"
      top
      :timeout="2000"
    >
      {{ snackbarMsg.text }}
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
          color="#2c3e50"
          :item="item"
          :index="index"
          @click="clickedReact(item.id)"
        >
          <i :class="item.symbol" />
          <p
            v-if="settings.emoticonsGroupId != 4"
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
      snackbar: false,
    };
  },
  computed: {
    settings() {
      return this.$store.getters.settings;
    },
    emoticons() {
      return this.$store.getters.emoticons;
    },
    snackbarMsg() {
      return this.$store.getters.notifications;
    },
  },
  watch: {
    snackbarMsg: {
      handler() {
        this.snackbar = true;
      },
      deep: true,
    },
  },
  created() {
    this.$store.dispatch('getActiveSettings')
      .then(() => {
      });
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
@import './styles/main.less';
.marg-btm {
  margin-bottom: 30px;
}
button.v-btn.theme--dark {
  background: @grey !important;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: @bluewood;
  margin-top: 60px;
}
body {
  background: @shark;
}
.thumb {
  margin-bottom: 3%;
  height: 170px;
  width: auto;
}
p {
  color: @alto;
  font-size: 28px;
}
button.v-btn.theme--light {
  height: 90px;
  width: 160px;
  font-size: 42px;
  color: white;
}
.values {
  margin-top: 20px;
  color: @white;
  font-weight: bold;
  font-size: 30px;
  margin-left: 10px;
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
  background: @error;
}
.success .v-snack__content {
  background: @success;
}
.v-snack.v-snack--active.v-snack--top {
  background: none !important;
}
::-webkit-scrollbar {
  display: none;
}
</style>
