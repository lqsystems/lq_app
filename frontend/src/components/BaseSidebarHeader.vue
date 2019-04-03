<template>
  <div class="sb-header">
    <img
      class="sb-header-icon"
      src="@/assets/reactor-3d-light.png"
      alt="reactor icon"
    >
    <div class="sb-header-title">
      Zee Prime
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseSidebarHeader',
};

</script>

<style lang='scss' scoped>
.sb-header {
  display: flex;
  align-items: center;
  padding: 1em 1.3em;
}

.sb-header-icon {
  width: 2.4em;
  margin-right: 1em;
}

.sb-header-title {
  font-size: 1.6em;
}

</style>
