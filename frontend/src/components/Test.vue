<template>
  <div class="test-wrapper">
    <v-card class="test-card">
      <slot />
      <div v-bind:style="{ marginTop: '40px' }">
        The sliders in the first example are from the Vuetify library. Unfortunately they
        perform poorly on mobile. This one performs much better. It's called
        <a href="https://refreshless.com/nouislider">
          noUiSlider
        </a> and is based on vanilla javascript.
        <br>
        <br>
        If we stick with this one I'll just have to work on the styles a bit to make it
        match the rest of the app. (Or not. I can't decide if I like how it looks out of the box
        What do you think?).
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'Test',
};

</script>

<style>
.test-wrapper {
  margin: 0 auto;
  margin-top: 50px;
  width: 600px;
}

.test-card {
  padding: 20px;
}
</style>
