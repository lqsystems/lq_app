<template>
  <v-list-tile
    class="sb-list-tile"
    v-on:click="handleClick"
  >
    <v-list-tile-action>
      <span
        class="sidebar-icon"
        v-bind:class="iconName"
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

<style>
</style>
