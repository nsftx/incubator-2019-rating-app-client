<template>
  <div id="app">
    <img
      id="thumb"
      v-show="!clicked"
      src="./assets/thumbs.png"
      style="display: block; margin-left:auto; margin-right: auto"
    >
    <p v-show="!clicked">Rate our service!</p>
    <div v-show="!clicked">
      <img src="./assets/smile.png" id="smile" class="emotions" v-on:click="clickedReact('smile')">
      <img
        v-show="numberOfReacts>3"
        src="./assets/between1.png"
        id="between1"
        class="emotions"
        v-on:click="clickedReact('between happy and meh')"
      >
      <img src="./assets/meh.png" id="meh" class="emotions" v-on:click="clickedReact('meh')">
      <img
        v-show="numberOfReacts>4"
        src="./assets/between2.png"
        id="between2"
        class="emotions"
        v-on:click="clickedReact('between meh and sad')"
      >
      <img src="./assets/sad.png" id="sad" class="emotions" v-on:click="clickedReact('sad')">
    </div>
    <div id="whole" v-show="clicked">
      <img src="./assets/tick.png">
      <p>{{message}}</p>
    </div>
    <br>
  </div>
</template>

<script>
export default {
  name: "App",
  data: function() {
    return {
      clicked: false,
      reactions: [],
      numberOfReacts: 3, //dohvatiti sa administratora,
      message: "Thank you for your rating!", //i ovo dohvatiti,
      time: 1, // i ovo
      settings:{},
      id : 1
    };
  },
  mounted: function() {
    this.getSettings();
  },
  methods: {
    clickedReact: function(react){
      this.clicked=true;
      const reacted = {
        reaction : react,
        settingId : this.id
      };
      setTimeout(this.goBack,this.time*1000);
      this.postData(reacted);
    },
    goBack: function() {
      this.clicked = false;
    },
    getSettings: function(){
      let that = this;
      this.axios.get("http://172.20.15.96:3000/settings").then(response => {
      let id = response.data.data.length - 1;
      that.message = response.data.data[id].message;
      that.time = response.data.data[id].message_timeout;
      that.numberOfReacts = response.data.data[id].emoticon_number;
      that.id = response.data.data[id].id;
    });
    },
    postData: function(obj) {
      let data = JSON.stringify(obj);

      let xhr = new XMLHttpRequest();
      //xhr.withCredentials = true;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          console.log(this.responseText);
        }
      });

      xhr.open("POST", "http://172.20.15.96:3000/ratings");
      xhr.setRequestHeader("Content-Type", "application/json");
      //xhr.setRequestHeader("Access-Control-Allow-Origin", xhr.getHeader("Origin"));
      xhr.setRequestHeader("cache-control", "no-cache");

      xhr.send(data);
          }
  }
};
</script>

<style lang="less">
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
</style>