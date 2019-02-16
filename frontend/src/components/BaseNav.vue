<template>
  <v-card
    height="100%"
    flat
  >
    <v-bottom-nav
      :active.sync="bottomNav"
      :value="true"
      absolute
      v-bind:style="{height: '100%'}"
      color="transparent"
    >
      <v-btn
        color="teal"
        flat
        value="recent"
      >
        <span>Recent</span>
        <v-icon>history</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="favorites"
      >
        <span>Favorites</span>
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="nearby"
      >
        <span>Nearby</span>
        <v-icon>place</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>

<script>
export default {
  name: 'BaseNav',
  data() {
    return {
      bottomNav: 'recent',
    };
  },
};
</script>

<style scoped lang="scss">
.v-item-group {
  padding: 20px;

  &.v-item-nav{
    height: 100%;
  }
}

.v-bottom-nav {
  .v-icon {
    font-size: 4em;
  }
}
</style>
