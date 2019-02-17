<template>
  <div class="reactor">
    <div class="reactor-col-left">
      <router-link to="/rc">
        Controls
      </router-link>
      left
    </div>
    <div class="reactor-col-right">
      right
    </div>
    <div class="nav">
      <BaseNav />
    </div>
  </div>
</template>


<script>
import BaseNav from '@/components/BaseNav';

export default {
  components: {
    BaseNav,
  },
};
</script>

<style scoped lang="scss">
.left {
  background-color: tomato;
}

.reactor {
  display: grid;
  height: 100%;
  grid-template-columns: 1fr 1fr;
  // grid-template-rows: 80% 100px;
  grid-template-areas:
    "left right";
}

.reactor-col-left {
  grid-area: left;
  background-color: lightgrey;
}

.reactor-col-right{
  grid-area: right;
  background-color: skyblue;
}

.nav {
  overflow: hidden;
  position: fixed;
  bottom: 0;
  height: 75px;
  width: 100%;
}

</style>
