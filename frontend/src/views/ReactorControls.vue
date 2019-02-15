<template>
  <div class="reactor-controls">
    <div class="rc-header">
      Zee Prime Controls
    </div>
    <div class="rc-main">
      <div class="rc-sidebar">
        <BaseSidebar />
      </div>
      <div class="rc-controls">
        Main
      </div>
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
  height: 100%;
}

.rc-header {
    background-color: lightgrey;
    padding: 1.2em 2em;
    font-size: 1.2em;
}

.rc-main{
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 1fr 3fr;
  grid-template-areas:
    "sidebar controls";

  div {
    border: 1px solid #000;
  }
}
.rc-sidebar {
  grid-area: sidebar;
}

.rc-controls {
  grid-area: controls;
}
</style>
