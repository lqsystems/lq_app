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
      <v-form>
        <v-text-field
          prepend-icon="person"
          name="Username"
          label="Username"
        />
        <v-text-field
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
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  created() {
    console.log('hello');
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
