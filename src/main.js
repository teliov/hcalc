import Vue from 'vue';
import App from './App';
import './assets/css/normalize.css';
import './assets/css/skeleton.css';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
