<template>
  <button class="button">
    Menu
  </button>
</template>

<script>
import callApi from '@/utils/api.utils.js';
import { LOGOUT_URL } from '@/constants/api.constants.js';

export default {
  name: 'BaseSidebarUserMenu',
};
</script>

<style lang='scss' scoped>
@import "../styles/variables";

.button {
  background-color: $accent-color-high-contrast;
  font-size: 1.1em;
  width: 100%;
  padding: .75em 2em;
  border-radius: 5px;
}

</style>
