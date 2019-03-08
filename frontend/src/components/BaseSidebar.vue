<template>
  <v-navigation-drawer
    :style="{ width: '100%' }"
    permanent
    class="sidebar"
  >
    <v-list
      dense
      class="pt-0"
    >
      <slot />
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'BaseSidebar',
};
</script>

<style scoped lang="scss">
</style>
