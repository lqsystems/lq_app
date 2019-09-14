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
      class="login-button logout-button"
      @click="logout"
    >
      <div class="icon-logout"></div>  
      <div class="logout-button-text">
        Logout
      </div>
    </button>
  </div>
</template>

<script>
import callApi from '@/utils/api.utils.js';
import { LOGOUT_URL } from '@/constants/api.constants.js';

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
  },
  methods: {
    async logout() {
      await callApi(LOGOUT_URL);
      this.$router.push('/login');
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
  // padding: 0.3em ($left-boundary-padding - 10) * 1px;
  padding-top: 0.5em;
  padding-bottom: 0;
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
  margin-left: 0.25em;
  width: 2.9em;
}

.header-user-menu {
  margin-left: auto;
}

.logout-button {
  margin-left: auto;
  background-color: $accent-color-high-contrast;
  background-color: $panel-background-color;
  font-size: 0.35em;
  padding: 0.75em 2em;
  padding-left: 2em;
  border-radius: 5px;
  display: flex;
  align-items: center;
}


.icon-logout {
  margin-right: 15px;
}

.dna-icon {
  width: 7px;
}

</style>
