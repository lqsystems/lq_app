<template>
  <div class="reactor-index">
    <div class="reactor-card">
      1.46C
    </div>
  </div>
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
