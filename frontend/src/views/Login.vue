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
        v-on:submit.prevent="login"
      >
        <v-text-field
          v-model="username"
          prepend-icon="person"
          name="Username"
          label="Username"
        />
        <v-text-field
          v-model="password"
          prepend-icon="lock"
          name="Password"
          label="Password"
          type="password"
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
import axios from 'axios';
import { mapActions } from 'vuex';
import callApi from '@/utils/ApiUtils.js';

const urlLogin = 'http://localhost:8888/users/login';
const urlFetch = 'http://localhost:8888/';

export default {
  name: 'Login',
  data() {
    return {
      username: 'newuser',
      password: '1oneoaK!',
    };
  },
  methods: {
    ...mapActions(['fetchModules']),
    async login() {
      const credentials = {
        username: this.username,
        password: this.password,
      };

      const { data: error } = await callApi(urlLogin, {
        method: 'post',
        data: credentials,
      });

      if (error.message && error.message[0]) {
        return alert(error.message[0]);
      }

      this.fetchModules('/');
    },
    fetchData() {
      axios.defaults.withCredentials = true;
      console.log('fetching');
      axios({
        method: 'get',
        url: urlFetch,
      }).then((res) => {
        console.log('fetch response');
        console.log(res.data);
      });
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
