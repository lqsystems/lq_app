<template>
  <v-navigation-drawer
    v-bind:style="{ width: '100%' }"
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
@import '../styles/variables';

// icon styles
.v-list__tile__action {
  font-weight: 400;
  font-size: 1.4em;
}

.v-list__tile__title {
  font-weight: 400;
  font-size: 1.5em;
}

.v-list {
  div {
    padding: 0.1em 0;
  }
}

.sidebar-icon {
  color: $grey-800;
}

.icon-air {
  font-size: .9em;
  position: relative;
  left: 0.1em;
}
</style>
