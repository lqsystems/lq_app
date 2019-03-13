<template>
  <v-card
    height="100%"
    :elevation="0"
  >
    <v-bottom-nav
      :active.sync="activeNavButton"
      :value="true"
      absolute
      :style="{height: '100%'}"
      color="transparent"
    >
      <v-btn
        color="teal"
        flat
        value="ZeePrime"
      >
        <div class="nav-logout-label">
          Zee Prime
        </div>
        <span class="icon-reactor nav-icon" />
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="MV1"
      >
        <div class="nav-logout-label">
          MV1
        </div>
        <span class="icon-reactor nav-icon" />
      </v-btn>

      <v-btn
        color="teal"
        flat
        value="logout"
        class="nav-logout-button"
        @click="logout"
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
import { mapGetters, mapMutations } from 'vuex';
import callApi from '@/utils/api.utils.js';
import { LOGOUT_URL } from '@/constants/api.constants.js';
import { UPDATE_SELECTED_MODULE } from '@/store/mutations.types';

export default {
  name: 'BaseNav',
  computed: {
    ...mapGetters(['selectedModuleName']),
    activeNavButton: {
      get() {
        return this.$store.getters.selectedModuleName;
      },
      set(clickedButton) {
        if (clickedButton === 'logout') {
          return;
        }
        this.UPDATE_SELECTED_MODULE(clickedButton);
      },
    },
  },
  methods: {
    ...mapMutations([UPDATE_SELECTED_MODULE]),
    async logout() {
      await callApi(LOGOUT_URL);
      this.$router.push('/login');
    },
  },
};
</script>
<style scoped lang="scss">
@import '../styles/variables';

.theme--light.v-sheet {
  border-top: 1px solid $grey-100;
}

.v-item-group {
  &.v-item-nav{
    height: 100%;
  }
  &.v-bottom-nav {
    box-shadow: none;
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

.nav-logout-label {
  position: relative;
  top: 0.4vh;
}
</style>
