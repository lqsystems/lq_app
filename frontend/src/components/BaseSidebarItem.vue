<template>
  <v-list-tile
    class="sidebar-list-tile"
    @click="handleClick"
  >
    <v-list-tile-action>
      <span
        class="sidebar-icon"
        :class="iconName"
      />
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title>{{ title }}</v-list-tile-title>
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    iconName: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      required: true,
    },
    handleClick: {
      type: Function,
      default: () => {},
    },
  },
};

</script>

<style scoped lang="scss">
@import '../styles/variables';

$font-size: 1.5;

.v-list__tile__action {
  font-weight: 400;
  font-size: $font-size + em;
}

.v-list__tile__title {
  font-weight: 400;
  font-size: $font-size - .1 + em;
}
.sidebar-list-tile {
  padding: 0.8em 0em;
  padding-left: 1.3em;
}
</style>
