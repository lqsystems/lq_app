<template>
  <div
    class="sidebar-item-wrapper"
    :class="{ 'is-active': active }"
  >
    <v-list-tile
      class="sidebar-item"
      @click="handleClick"
    >
      <v-list-tile-action>
        <img
          v-if="imgIcon"
          class="sb-header-icon"
          src="@/assets/reactor-3d-light.png"
          alt="reactor icon"
        >
        <span
          v-else
          class="sidebar-icon"
          :class="iconName"
        />
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>
          {{ title }}
        </v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
  props: {
    iconName: {
      type: String,
      default: '',
    },
    imgIcon: {
      type: Boolean,
      defaults: false,
    },
    title: {
      type: String,
      required: true,
    },
    handleClick: {
      type: Function,
      default: () => {},
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
};

</script>

<style scoped lang="scss">
@import '../styles/variables';
.icon-arrow-right {
  font-size: 1.5em;
}

$font-size: 1.5;

.v-list__tile__action {
  font-weight: 400;
  font-size: $font-size + em;
}


.v-list__tile__title {
  font-weight: 400;
  font-size: $font-size - .1 + em;
}

.sidebar-item {
  margin: .7em 0;
  padding-left: .4em;

  &.v-list__tile {
    height: 40px;
  }
}

$radius: 25px;
.sidebar-item-wrapper {
  &.is-active {
    background-color: $sidebar-active-item-color;
    border-radius: 0 $radius $radius 0;
    opacity: .7;
    width: 88%;
    transition: background-color 500ms ease;
    transform: scale(1.1);
  }

  background-color: transparent;
  margin: 10px 0;
}

.sb-header-icon {
  width: 1.4em;
  margin-right: 1em;
}
</style>
