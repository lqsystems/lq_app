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
.test {
  display: flex;
  height: 100vh;
  width: 100%;
};

.tchild {
  background-color: skyblue;
  width: 50%;
  height: 100vh;
}
.left {
  background-color: tomato;
}
.reactor {
  display: grid;
  height: 100vh;
  max-width: 100%;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 120px;
  grid-template-areas:
    "left right"
    "nav nav";
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
  grid-area: nav;
  border: 1px solid #000;
}

</style>
