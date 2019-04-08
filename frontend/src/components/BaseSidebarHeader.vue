<template>
  <div class="sb-header">
    <img
      class="sb-header-icon"
      src="@/assets/reactor-3d-light.png"
      alt="reactor icon"
    >
    <div class="sb-header-title">
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
  },
};

</script>

<style lang='scss' scoped>
@import '../styles/variables';

.sb-header {
  display: flex;
  align-items: center;
  padding: 1em 1.3em;
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
