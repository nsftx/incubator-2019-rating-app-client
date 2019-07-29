<template>
  <div id="app">
    <link
     rel="stylesheet"
     href="https://use.fontawesome.com/releases/v5.6.3/css/all.css"
     integrity="sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/"
     crossorigin="anonymous"
   >
    <img
      id="thumb"
      v-show="!clicked"
      src="./assets/positive-vote.svg"
      style="display: block; margin-left:auto; margin-right: auto"
    >
    <br>
    <p v-show="!clicked">Rate our service!</p>
    <br>
    <div v-show="!clicked">
      <v-btn v-for="(item, index) in emoticons" 
             v-bind:item="item" 
             v-bind:index="index" 
             v-bind:key="item.id"
             @click="clickedReact(item.id)"
             >
            <i :class="item.symbol"></i>
            <p class="values" v-if="emoticonsId!=30">{{index+1}}</p>
      </v-btn>
    </div>
    <div id="whole" v-show="clicked">
      <img src="./assets/check.svg">
      <br><br>
      <p>{{message}}</p>
    </div>
    <br>
  </div>
</template>

<script>
import axios from 'axios'
const API_URL='http://172.20.15.9:3000'
export default {
  name: "App",
  data() {
    return {
      clicked: false,
      reactions: [],
      numberOfReacts: 5, 
      message: "Thank you for your rating!", 
      time: 1, 
      settings:{},
      id : 1,
      emoticonsId: 1,
      emoticons: []
    };
  },
  mounted() {
    this.getEmoticonGroups();
    this.notifyOnSettingsChange();
  },
  methods: {
    notifyOnSettingsChange() {
      const socket = require('socket.io-client')('http://172.20.15.9:7000');
      socket.on('newSettings', (data) => {
        this.emoticons = data.emoticons;
      });
    },
    clickedReact(react){
      this.clicked = true
      const reacted = {
        emoticonId : react
      };
      setTimeout(this.goBack,this.time*1000);
      this.postData(reacted);
    },
    goBack() {
      this.clicked = false;
    },
    getEmoticonGroups() {
      let that = this
      axios.get(`${API_URL}/settings/last`)
			.then(response => {
            that.emoticons=response.data.emoticons
            that.emoticonsId=response.data.data.emoticonsGroupId
      })
    },
    postData(obj) {
      axios.post(`${API_URL}/ratings`, obj)
			.then(response => response.data)
    }
  },
};
</script>

<style lang="less">
button.v-btn.theme--light {
    height: 55px;
    width: 125px;
    font-size: 20px;
}
body {
  background: rgb(36, 40, 46);
}
.emotions {
  height: 120px;
  width: auto;
  margin-top: 12px;
  cursor: pointer;
}
#thumb {
  height: 170px;
  width: auto;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#smile,
#meh,
#between1,
#between2,
#sad {
  margin-right: 20px; 
}
#whole {
  height: 100%;
  width: 100%;
  cursor: pointer;
}
p {
  color: rgb(214, 214, 214);
  font-size: 28px;
}
.values{
  margin-top: 13px;
  color: black;
  font-size: 24px;
  margin-left: 3px;
}
</style>