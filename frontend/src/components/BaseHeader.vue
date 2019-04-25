<template>
  <div
    class="header"
  >
    <span
      v-if="backIcon"
      v-ripple
      class="icon-back"
      @click="handleIconClick"
    />
    <img
      class="header-logo"
      src="@/assets/logo-small.png"
      alt="company logo"
      @click="handleIconClick"
    >
    <BaseDropdown class="header-dropdown">
      <a
        v-ripple
        href="#"
      >Link 1</a>
      <a
        v-ripple
        href="#"
      >Link 2</a>
      <a
        v-ripple
        href="#"
      >Link 3</a>
    </BaseDropdown>
  </div>
</template>

<script>
import BaseDropdown from '@/components/BaseDropdown';

export default {
  name: 'BaseHeader',
  components: {
    BaseDropdown,
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

.header-dropdown {
  font-size: .5em;
  margin-left: auto;
}
</style>
