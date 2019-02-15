<template>
  <div class="reactor-controls">
    <div class="rc-sidebar">
      <BaseSidebar />
    </div>
    <div class="rc-main">
      Main
    </div>
  </div>
</template>

<script>
import BaseSidebar from '@/components/BaseSidebar';

export default {
  components: {
    BaseSidebar,
  },
};
</script>

<style scoped lang="scss">
.reactor-controls {
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 1fr 2fr;
  grid-template-areas:
    "sidebar main";
  grid
  div {
    border: 1px solid #000;
  }
}
.rc-sidebar {
  grid-area: sidebar;
}

.rc-main {
  grid-area: main;
}
</style>
