<template>
  <BaseCard class="login-card">
    <v-form
      @submit.prevent="login"
    >
      <v-text-field
        v-model="username"
        dark
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
          dark
          primary
          large
          block
          type="submit"
        >
          Login
        </v-btn>
      </v-card-actions>
    </v-form>
  </BaseCard>
</template>

<script>
import { mapActions } from 'vuex';
import BaseCard from '@/components/BaseCard';
import { FETCH_MODULES } from '@/store/actions.types.js';
import { LOGIN_URL } from '@/constants/api.constants.js';
import callApi from '@/utils/api.utils.js';

export default {
  name: 'Login',
  components: {
    BaseCard,
  },
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
.login-card {
  padding: 2em;
  width: 550px;
  margin: 15vh auto;
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
