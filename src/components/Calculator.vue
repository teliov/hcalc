<template>
  <div class="calc-box">
    <DisplayHandler
      v-on:eval="onEval"
      v-on:eqnchanged="onEqnChanged"
      v-bind:dispEqn="calcEqn"
      v-bind:dispRes="calcRes"
      v-bind:bus="bus"
      v-bind:currChar="calcChar">
      </DisplayHandler>
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
      calcChar: "",
      bus: new Vue()
    }
  },

  methods: {
    onKeyPressed: function (value) {
      const commands = ["ANS", "CLR", "RESET", "DEL", "="];

      if (commands.indexOf(value.toString().toUpperCase()) > -1) {
        this.handleCommand(value);
      } else {
        this.calcChar = value;
        // appending a timestamp makes it so that we can type the same two characters
        // consecutively; otherwise, vue would not be able to distinguish that the
        // calcChar has changed value; since the previous char is the same as the newly typed character
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
          this.bus.$emit('calc-event', 'do-delete');
          break;
        case "clr":
          this.resetEqn();
          break;
        case "reset":
          this.resetEqn();
          this.resetResult();
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
    },

    resetEqn: function() {
      this.calcEqn = "";
    },

    resetResult: function () {
      this.calcRes = "";
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
