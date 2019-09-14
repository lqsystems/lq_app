<template>
  <div class="sidebar">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BaseSidebar',
};
</script>

<style scoped lang="scss">
.sidebar {
  height: 100%;
}
</style>
