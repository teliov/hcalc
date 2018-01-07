<template>
  <div class="key-box">
    <div class="row key-row">
      <div class="columns three">
        <button v-on:click="keyClicked">Ans</button>
      </div>
      <div class="columns three">
        <button v-on:click="keyClicked">Del</button>
      </div>
      <div class="columns three">
        <button v-on:click="keyClicked" class="fsem15">(</button>
      </div>
      <div class="columns three">
        <button v-on:click="keyClicked" class="fsem15">)</button>
      </div>
    </div>
    <div class="row key-row">
      <div class="columns three">
        <button v-on:click="keyClicked">7</button>
      </div>
      <div class="columns three">
        <button v-on:click="keyClicked">8</button>
      </div>
      <div class="columns three">
        <button v-on:click="keyClicked">9</button>
      </div>
      <div class="columns three">
        <button v-on:click="keyClicked" class="fsem15">+</button>
      </div>
    </div>
    <div class="row key-row">
      <div class="columns three">
        <button v-on:click="keyClicked">4</button>
      </div>
      <div class="columns three">
        <button v-on:click="keyClicked">5</button>
      </div>
      <div class="columns three">
        <button v-on:click="keyClicked">6</button>
      </div>
      <div class="columns three">
        <button v-on:click="keyClicked" class="fsem15">-</button>
      </div>
    </div>
    <div class="row key-row">
      <div class="columns three">
        <button v-on:click="keyClicked">1</button>
      </div>
      <div class="columns three">
        <button v-on:click="keyClicked">2</button>
      </div>
      <div class="columns three">
        <button v-on:click="keyClicked">3</button>
      </div>
      <div class="columns three">
        <button v-on:click="keyClicked" class="fsem15">x</button>
      </div>
    </div>
    <div class="row key-row">
      <div class="columns three">
        <button v-on:click="keyClicked" class="fsem2">.</button>
      </div>
      <div class="columns three">
        <button v-on:click="keyClicked">0</button>
      </div>
      <div class="columns three">
        <button v-on:click="keyClicked" class="fsem15">=</button>
      </div>
      <div class="columns three">
        <button v-on:click="keyClicked" class="fsem15">/</button>
      </div>
    </div>
    <div class="row key-row">
      <div class="columns six">
        <button v-on:click="keyClicked" class="u-full-width">CLR</button>
      </div>
      <div class="columns six">
        <button v-on:click="keyClicked" class="u-full-width pink">RESET</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  export default Vue.component('keypad', {
    name: 'Keypad',

    methods: {
      keyClicked: function (event) {
        const value = event.target.innerText;
        this.$emit('keypressed', value);
      }
    }
  });
</script>

<style scoped>
  .key-row {
    padding-left: 4px;
  }

  .fsem15 {
    font-size: 1.5rem;
  }

  .fsem2 {
    font-size: 2rem;
  }
</style>
