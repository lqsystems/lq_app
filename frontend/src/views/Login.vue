<template>
  <div class="login view">
    <BaseCard class="login-card">
      <img
        class="login-logo"
        src="@/assets/logo-small.png"
        alt="company logo"
      >
      <form
        class="login-form"
        @submit.prevent="login"
      >
        <div class="text-input-wrapper">
          <div class="text-input">
            <input
              v-model="username"
              placeholder="Username"
              type="text"
            >
          </div>
        </div>
        <div class="text-input-wrapper">
          <div class="text-input">
            <input
              v-model="password"
              placeholder="Password"
              type="password"
            >
          </div>
        </div>
        <button class="login-button">
          Sign In
        </button>
      </form>
    </BaseCard>
  </div>
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
@import '../styles/variables';

.login-card {
  padding: 2.5em 1em;
  padding-top: 1.5em;
  width: 500px;
  margin: 20vh auto;
  //TODO use a sass variable for this color
  color: white;
}

.login-logo {
  margin-left: 40px;
  width: 140px;
}

.login-form {
  padding: 0 4em;
}

.text-input-wrapper {
  display: flex;
  align-items: center;
  margin: 2em 0;
}

.text-input-icon {
  margin-right: 1em;
}

.text-input {
  width: 100%;

  input {
    border: 1px solid #2b3553;
    border-radius: 7px;
    padding: .75em 2em;
    width: 100%;
    &:focus {
      outline: none;
    }
  }
}

.login-button {
  background-color: $accent-color-high-contrast;
  font-size: 1.1em;
  width: 100%;
  padding: .75em 2em;
  border-radius: 5px;
}
</style>
