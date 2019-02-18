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
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        class="sb-list-tile"
        @click=""
      >
        <v-list-tile-action>
          <span
            class="sidebar-icon"
            v-bind:class="item.icon"
          />
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>{{ item.title }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'BaseSidebar',
  data() {
    return {
      items: [
        { title: 'Air', icon: 'icon-air' },
        { title: 'Light', icon: 'icon-light' },
        { title: 'Heater', icon: 'icon-heat' },
      ],
      right: null,
    };
  },
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
