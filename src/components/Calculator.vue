<template>
  <div class="calc-box">
    <DisplayHandler
      v-on:eval="onEval"
      v-on:eqnchanged="onEqnChanged"
      v-bind:dispEqn="calcEqn" v-bind:dispRes="calcRes" v-bind:currChar="calcChar"></DisplayHandler>
    <Keypad v-on:keypressed="onKeyPressed"></Keypad>
  </div>
</template>

<script>
import Vue from 'vue';
import DisplayHandler from './DisplayHandler';
import Keypad from './Keypad';

export default Vue.component('calculator', {
  name: 'Calculator',
  components: {
    DisplayHandler,
    Keypad
  },

  data: function() {
    return {
      calcEqn: "",
      calcRes: "",
      calcChar: ""
    }
  },

  methods: {
    onKeyPressed: function (value) {
      const commands = ["ANS", "CLR", "RESET", "DEL", "="];
      if (!Number.isNaN(Number.parseInt(value))) {
        this.calcChar = value;
        this.calcChar += "|" + (new Date()).getTime();
      } else if (commands.indexOf(value.toUpperCase()) > -1) {
        this.handleCommand(value);
      } else {
        // has to be a char;
        this.calcChar = value;
        this.calcChar += "|" + (new Date()).getTime();
      }
    },

    onEqnChanged: function (value) {
      this.calcEqn = value;
    },

    onEval: function () {
      this.handleCommand("=");
    },

    handleCommand: function (command) {
      command = command.toLowerCase();
      switch (command) {
        case "ans":
          this.onKeyPressed(this.calcRes);
          break;
        case "del":
          break;
        case "clr":
          this.calcEqn = "";
          break;
        case "reset":
          this.calcEqn = "";
          this.calcRes = "";
          break;
        case "=":
          let eqn = this.calcEqn;
          // replace all the (x|X) with (*)
          eqn = eqn.replace(/x|X/, '\*');
          try {
            this.calcRes = eval(eqn);
          } catch (e){
            console.log(e);
          }
          break;
      }
    }
  }
});

</script>

<style>
  .calc-box {
    padding: 5px;
    box-sizing: border-box;
    border: 2px solid #2196F3;
    border-radius: 4px;
  }
</style>
