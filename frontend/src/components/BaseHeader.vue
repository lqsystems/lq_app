<template>
  <div
    class="header"
    @click="handleIconClick"
  >
    <span
      v-if="backIcon"
      v-ripple
      class="icon-back"
    />
    <img
      class="header-logo"
      src="@/assets/logo-small.png"
      alt="company logo"
    >
  </div>
</template>

<script>
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
  },
};
</script>

<style lang="scss" scoped>
.header {
  align-items: center;
  padding: 0.3em 0.4em;
  display: flex;
  color: white;
  font-size: 3.9em;
}

.icon-back {
  border-radius: 50%;
  padding: 0.2em;
  font-size: 0.7em;
}

.header-logo {
  margin-left: 0.35em;
  width: 2.2em;
}
</style>
