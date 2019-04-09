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
    <!-- <BaseSidebarUserMenu class="header-user-menu" /> -->
  </div>
</template>

<script>
import BaseSidebarUserMenu from '@/components/BaseSidebarUserMenu';

export default {
  name: 'BaseHeader',
  components: {
    BaseSidebarUserMenu,
  },
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
@import '../styles/variables';

.header {
  align-items: center;
  padding: 0.3em ($left-boundary-padding - 10) * 1px;
  display: flex;
  color: white;
  font-size: 3.4em;
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

.header-user-menu {
  margin-left: auto;
}
</style>
