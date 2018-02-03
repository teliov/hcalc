<template>
  <div class="key-box">
    <div class="row key-row" v-for="item in keys">
      <div class="columns three" v-for="btn in item">
        <button v-on:click="keyClicked" v-bind:class="btn.class" v-bind:data-key="btn.key">{{ btn.key }}</button>
      </div>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  export default Vue.component('keypad', {
    name: 'Keypad',

    data: function () {
      let keys = [
        [
          {key: 'Ans', class:""},{key: 'Del', class:""},{key: '(', class:"fsem15"},{key: ')', class:"fsem15"}
        ],
        [
          {key: '7', class:""},{key: '8', class:""},{key: '9', class:""},{key: '+', class:"fsem15"}
        ],
        [
          {key: '4', class:""},{key: '5', class:""},{key: '6', class:""},{key: '-', class:"fsem15"}
        ],
        [
          {key: '1', class:""},{key: '2', class:""},{key: '3', class:""},{key: 'x', class:"fsem15"}
        ],
        [
          {key: '.', class:"fsem2"},{key: '0', class:""},{key: '=', class:"fsem15"},{key: '/', class:"fsem15"}
        ],
        [
          {key: 'CLR', class:"u-full-width"},{key: 'RESET', class:"u-full-width"}
        ]
      ];

      return {
        keys: keys
      }
    },

    methods: {
      keyClicked: function (event) {
        const value = event.target.dataset.key;
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
