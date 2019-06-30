<template>
  <div class="header">
    <span
      v-if="backIcon"
      v-ripple
      class="icon-back"
      @click="handleIconClick"
    />
    <img
      class="header-logo"
      src="@/assets/kapsel-logo.png"
      alt="company logo"
      @click="handleLogoClick"
    >
    <button
      v-if="showHistoryButton"
      class="login-button run-button"
      @click="routeToHistory"
    >
      <img
        class="dna-icon"
        src="@/assets/dna-white.svg"
        alt=""
      >
      <div class="run-button-text">
        Runs
      </div>
    </button>
  </div>
</template>

<script>
import router from '@/router';

export default {
  name: 'BaseHeader',
  props: {
    title: {
      type: String,
      default: '',
    },
    backIcon: {
      type: Boolean,
      default: false,
    },
    handleIconClick: {
      type: Function,
      default: () => { },
    },
    handleLogoClick: {
      type: Function,
      default: () => { },
    },
    showHistoryButton: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    routeToHistory() {
      router.push('/runs');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../styles/variables";

.header-links {
  font-size: 0.5em;
  display: flex;
}

.header-link {
  margin-right: 30px;
}

.selected {
  border-bottom: 2px solid white;
}

.header {
  align-items: center;
  padding: 0.3em ($left-boundary-padding - 10) * 1px;
  padding-right: 60px;
  display: flex;
  color: white;
  font-size: 3.4em;
}

.icon-back {
  border-radius: 50%;
  padding: 0.2em;
  font-size: 0.7em;
}

.header-logo {
  margin-left: 0.35em;
  width: 2.2em;
}

.header-user-menu {
  margin-left: auto;
}

.run-button {
  margin-left: auto;
  background-color: $accent-color-high-contrast;
  background-color: $panel-background-color;
  font-size: 0.35em;
  padding: 0.75em 2em;
  border-radius: 5px;
  display: flex;
  align-items: center;
}

.dna-icon {
  width: 7px;
}

.run-button-text {
  margin-left: 10px;
}
</style>
