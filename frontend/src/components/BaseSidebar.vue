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
  padding-top: 1.5em;
  height: 100%;
}
</style>
