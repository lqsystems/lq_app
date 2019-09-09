<template>
  <div
    class="sb-header"
    @click="emitModuleName"
  >
    <img
      class="sb-header-icon"
      src="@/assets/reactor-3d-light.png"
      alt="reactor icon"
    >
    <div
      class="sb-header-title"
      :style="styleObject"
    >
      {{ title }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseSidebarHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
    activeModule: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      styleObject: {
        fontSize: '1em',
      },
    };
  },
  watch: {
    activeModule(activeMod) {
      this.toggleFontSize(activeMod);
    },
  },

  mounted() {
    this.toggleFontSize(this.activeModule);
  },
  methods: {
    toggleFontSize(activeMod) {
      if (activeMod === this.title) {
        this.styleObject.fontSize = '2em';
      } else {
        this.styleObject.fontSize = '1em';
      }
    },
    emitModuleName() {
      this.$emit('clicked', this.title);
    },
  },
};

</script>

<style lang='scss' scoped>
@import "../styles/variables";

.sb-header {
  display: flex;
  align-items: center;
  padding: 1em $left-boundary-padding * 1px;
  font-size: 1.3em;
}

.sb-header-icon {
  width: 2.4em;
  margin-right: 1em;
}

.sb-header-title {
  color: $font-color-medium-contrast;
  font-size: 1.5em;
}
</style>
