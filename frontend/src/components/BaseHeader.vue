<template>
  <div
    class="header"
    @click="handleIconClick"
  >
    <div
      v-ripple
      class="header-icon-wrapper"
    >
      <span class="icon-back" />
    </div>
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
      required: true,
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
  padding: .4em 1em;
  display: flex;
  color: white;
}

.header-icon-wrapper {
  padding: .8em;
  border-radius: 100%;
}

.icon-back {
  font-size: 2em;
}

.header-logo {
  margin-left: .4em;
  width: 6em;
}

</style>
