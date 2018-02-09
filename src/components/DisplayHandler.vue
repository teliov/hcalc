<template>
  <div class="disp-box">
    <div class="eqn-box">
      <input ref="eqn-box" type="text" class="eqn" v-model="eqnStr" v-on:blur="reFocus" autofocus>
    </div>

    <div class="res-box">
      <span class="res">{{resStr}}</span>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  export default Vue.component('display-handler', {
    name: 'DisplayHandler',
    props: ['dispEqn', 'dispRes', 'currChar', 'bus'],
    created: function () {
      let _this = this;
      this.bus.$on('calc-event', (action) => {
        switch (action) {
          case 'do-delete':
            this.doDelete();
            break;
        }
      })
    },
    data: function () {
      let resStr = "";
      if (this.dispRes) {
        resStr = "Ans = " + this.dispRes
      } else {
        resStr = this.dispRes
      }

      return {
        eqnStr: this.dispEqn,
        resStr: resStr
      }
    },
    methods: {
      reFocus: function() {
        let target = this.$refs['eqn-box'];
        target.focus();
      },

      doDelete: function () {
        let target = this.$refs['eqn-box'];
        let selectionIndex = target.selectionStart;
        let value = target.value;
        if (value) {
          this.eqnStr = value.slice(0,selectionIndex-1) + value.slice(selectionIndex);
        }

        target.focus();
      }
    },
    watch: {
      currChar: function (value) {
        if (!value) {
          return;
        }

        value = value.split("|")[0];
        let eqnHasChanged = false;
        if (!Number.isNaN(Number.parseInt(value))) {
          this.eqnStr += value;
          eqnHasChanged = true;
        } else {
          // has to be a symbol
          const symbols = ["(", ")", ".", "+", "-", "*", "X", "x", "/"];
          if (symbols.indexOf(value) > -1) {
            if (value === "*" || value === "x" || value === "X") {
              value = "x";
            }
            this.eqnStr += value;
            eqnHasChanged = true;
          }
        }

        if (eqnHasChanged) {
          this.$emit("eqnchanged", this.eqnStr);
        }

        this.reFocus();
      },

      dispRes: function (value) {
        if (value) {
          this.resStr = "Ans = " + this.dispRes
        } else {
          this.resStr = this.dispRes
        }

        this.reFocus();
      },

      dispEqn: function (value) {
        this.eqnStr = value;
        this.$emit("eqnchanged", this.eqnStr);
      },

      eqnStr: function (newValue, oldValue) {
        const reg = /^[1234567890\-\+\/\.\(\)\*xX=]+$/;
        let emitEval = false;
        if (reg.test(newValue) || newValue == "") {
          let newChar = null;
          let idx = 0;
          for (idx=0; idx < newValue.length; idx++) {
            if (oldValue.length - 1 >= idx) {
              let tempNewChar = newValue[idx];
              let tempOldChar = oldValue[idx];

              if (tempNewChar !== tempOldChar) {
                newChar = newValue[idx];
              }
            } else {
              newChar = newValue[idx];
            }

            if (newChar !== null) {
              break;
            }
          }

          if (newChar === "=") {
            newValue = newValue.slice(0, idx) + newValue.slice(idx+1);
            emitEval = true;
          }

          this.$emit("eqnchanged", newValue);
          if (emitEval) {
            this.$emit("eval", true);
          }
          this.eqnStr = newValue;
        } else {
          this.eqnStr = oldValue;
        }
      }
    }
  });
</script>

<style scoped>
  .disp-box {
    min-height: 120px;
    padding: 5px;
    box-sizing: border-box;
    border: 2px solid #2196F3;
    border-radius: 4px;
    margin-bottom: 5px;
  }

  input.eqn, input.eqn:focus {
    border: none;
    line-height: 1.6;
    height: auto;
  }

  .eqn-box, .res-box {
    min-height: 50px;
    font-size: 2em;
  }
</style>
