<template>
  <v-container class="login-wrapper">
    <v-card>
      <v-card-title
        primary-title
        class="lq-title"
      >
        <h1 class="lq-title-text">
          LQ Systems
        </h1>
      </v-card-title>
      <v-form
        @submit.prevent="login"
      >
        <v-text-field
          v-model="username"
          prepend-icon="person"
          name="Username"
          placeholder="Username"
        />
        <v-text-field
          v-model="password"
          prepend-icon="lock"
          name="Password"
          type="password"
          placeholder="Password"
        />
        <v-card-actions>
          <v-btn
            primary
            large
            block
            type="submit"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex';
import { FETCH_MODULES } from '@/store/actions.types.js';
import { LOGIN_URL } from '@/constants/api.constants.js';
import callApi from '@/utils/api.utils.js';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    ...mapActions([FETCH_MODULES]),
    async login() {
      const credentials = {
        username: this.username,
        password: this.password,
      };

      const { data: error } = await callApi(LOGIN_URL, {
        method: 'POST',
        data: credentials,
      });

      if (error.message && error.message[0]) {
        return alert(error.message[0]);
      }

      this.FETCH_MODULES('/');
    },
  },
};

</script>

<style scoped lang="scss">
.login-wrapper {
  width: 550px;
  margin: 15vh auto;
}

.v-card {
  padding: 1.5em;
}

.lq-title {
  padding-top: 1em;
}

.lq-title-text {
  font-size: 1.4em;
  padding-top: 0;
}
.lq-title-text {
  font-size: 1.5em;
  padding-top: 0;
}
.lq-title-text {
  font-size: 1.5em;
  padding-top: 0;
}
</style>
