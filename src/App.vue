<template>
  <div class="container" id="app">
    <div class="row">
      <div class="offset-by-three columns six">
        <Calculator></Calculator>
      </div>
    </div>
  </div>
</template>

<script>
import Calculator from './components/Calculator';
import Vue from 'vue';

const app = Vue.component('app', {
  name: 'app',
  components: {
    Calculator
  }
});

export default app;
</script>

<style>
</style>
