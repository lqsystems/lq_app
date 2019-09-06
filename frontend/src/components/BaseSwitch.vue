<template>
  <label
    class="cl-switch cl-switch-large"
    @click.prevent="handleToggle"
  >
    <input
      ref="toggleSwitch"
      type="checkbox"
      :disabled="isDisabled"
      @click="handleToggle"
    >
    <span class="switcher" />
  </label>
</template>

<script>
export default {
  name: 'BaseSwitch',
  props: {
    isOn: {
      type: Boolean,
      required: true,
    },
    isDisabled: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    isOn(isOn) {
      const { toggleSwitch } = this.$refs;
      toggleSwitch.checked = !isOn;
    },
  },
  mounted() {
    const { toggleSwitch } = this.$refs;
    // UI for switch is inverted
    // ie when checked === false switch handle is in left position
    toggleSwitch.checked = !this.isOn;
  },
  methods: {
    handleToggle() {
      const { toggleSwitch } = this.$refs;

      if (this.isDisabled) {
        return;
      }

      toggleSwitch.checked = !toggleSwitch.checked;
      this.$emit('toggle');
    },
  },
};
</script>

<style lang='scss'>
@import '../styles/variables.scss';

$handle-color: $red;
$track-color: $red-dark;
$handle-color-checked: $grey-700;

// TODO delete these unnecessary colors
$btn-main-color: #3f51b5;
$black-color: #343434;
$red-color: $red;
$green-color: #29cc97;
$orange-color: #ff9800;
$ios-green: #4bd964;

.cl-switch {
  padding: 50px;
  // z-index: 1000;

  input[type="checkbox"] {
    display: none;
    visibility: hidden;
  }

  /*
  Switcher Style
   */
  .switcher {
    display: inline-block;
    border-radius: 100px;
    width: 35px;
    height: 15px;
    background-color: $track-color;
    position: relative;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    vertical-align: middle;
    cursor: pointer;


    &:before {
      content: "";
      display: block;
      width:  $input-handle-width;
      height: $input-handle-width;
      background-color: $red;
      // box-shadow: 0 1px 3px rgba(0, 0, 0, 0.6);
      border-radius: 50%;
      margin-top: -2.5px;
      position: absolute;
      top: 0;
      right: 0;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
      box-sizing: border-box;
      margin-right: 0;
      -webkit-transition: all 0.2s;
      -moz-transition: all 0.2s;
      -ms-transition: all 0.2s;
      -o-transition: all 0.2s;
      transition: all 0.2s;
    }

    &:active:before {
      // // box-shadow: 0 1px 3px rgba(0, 0, 0, 0.6),
      // // 0 0 0 10px rgba($btn-main-color, 0.3);
      // transition: all, 0.1s;
    }
  }

  .label {
    font-family: "Roboto", sans-serif;
    cursor: pointer;
    vertical-align: middle;
    margin: 0 5px;
  }

  /*
  When Checked
   */
  input[type="checkbox"]:checked + .switcher {
    background-color: lighten($handle-color-checked, 5);

    &:before {
      right: 100%;
      margin-right: -20px;
      background-color: $handle-color-checked;
    }
  }

  & [disabled]:not([disabled="false"]) + .switcher {
    $disabled-color: $grey-900;
    background: $handle-color-checked !important;
    opacity: .3;

    &:active:before {
      // box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2) !important;
    }

    &:before {
      background-color: $handle-color-checked !important;
      // box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2) !important;
    }
  }


  /*
  Switch large style
   */
  &.cl-switch-large {
    .switcher {
      width: 52px;
      height: 22px;

      transform: scale(.7);

      &:before {
        width: 30px;
        height: 30px;
        margin-top: -4px;
      }
    }

    .label {
      font-size: 18px;
    }

    input[type="checkbox"]:checked + .switcher {
      &:before {
        margin-right: -30px;
      }
    }
  }


// TODO delete these unnecessary classes
  /*
  Switch xlarge style
   */
  &.cl-switch-xlarge {
    .switcher {
      width: 87px;
      height: 37px;

      &:before {
        width: 50px;
        height: 50px;
        margin-top: -6px;
      }
    }

    .label {
      font-size: 24px;
    }

    input[type="checkbox"]:checked + .switcher {
      &:before {
        margin-right: -50px;
      }
    }
  }


  /*
  Switch Black color style
   */

  &.cl-switch-black {
    input[type="checkbox"]:checked + .switcher {
      background-color: lighten($black-color, 20);

      &:before {
        background-color: $black-color;
      }
    }

    .switcher:active:before {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.6),
      0 0 0 10px rgba($black-color, 0.3);
    }
  }

  /*
  Switch Red color style
   */

  &.cl-switch-red {
    input[type="checkbox"]:checked + .switcher {
      background-color: lighten($red-color, 20);

      &:before {
        background-color: $red-color;
      }
    }

    .switcher:active:before {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.6),
      0 0 0 10px rgba($red-color, 0.3);
    }
  }

  /*
  Switch green color style
   */

  &.cl-switch-green {
    input[type="checkbox"]:checked + .switcher {
      background-color: lighten($green-color, 20);

      &:before {
        background-color: $green-color;
      }
    }

    .switcher:active:before {
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.6),
      0 0 0 10px rgba($green-color, 0.3);
    }
  }
}
</style>
