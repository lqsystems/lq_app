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
        <div class="nav-logout-label">
          Zee Prime
        </div>
        <span class="icon-reactor nav-icon" />
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="favorites"
      >
        <div class="nav-logout-label">
          LQR
        </div>
        <span class="icon-reactor nav-icon" />
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="logout"
        class="nav-logout-button"
        v-on:click="logout"
      >
        <div class="nav-logout-label">
          Logout
        </div>
        <span class="icon-logout nav-icon" />
      </v-btn>
    </v-bottom-nav>
  </v-card>
</template>

<script>
import callApi from '@/utils/ApiUtils.js';
import { LOGOUT_URL } from '@/constants/ApiConstants.js';

export default {
  name: 'BaseNav',
  data() {
    return {
      bottomNav: 'favorites',
    };
  },
  methods: {
    async logout() {
      await callApi(LOGOUT_URL);
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped lang="scss">
.v-item-group {
  &.v-item-nav{
    height: 100%;
  }
}

.v-bottom-nav {
  .v-icon {
    font-size: 4.5vh;
  }
}

.nav-icon {
  font-size: 4vh;
}

.nav-logout-button {
  padding-top: 2.1vh !important;
}

.nav-logout-label {
  position: relative;
  top: 0.4vh;
}
</style>
