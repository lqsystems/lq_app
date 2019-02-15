<template>
  <v-navigation-drawer
    v-bind:style="{ width: '100%' }"
    permanent
  >
    <v-list
      dense
      class="pt-0"
    >
      <v-list-tile
        v-for="item in items"
        :key="item.title"
        @click=""
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
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
        { title: 'Air', icon: 'pan_tool' },
        { title: 'Heater', icon: 'question_answer' },
        { title: 'Light', icon: 'call_split' },
      ],
      right: null,
    };
  },
};
</script>

<style>
.v-list--dense .v-list__tile {
    font-size: 1.5em;
    font-weight: 400;
}
</style>
