<template>
  <div class="reactor">
    <div class="reactor-main">
      <div class="reactor-col-left">
        left
      </div>
      <div class="reactor-col-right">
        right
      </div>
    </div>
    <div class="nav">
      <div>nav</div>
    </div>
  </div>
</template>


<script>
export default {
  components: {
  },
};
</script>

<style scoped lang="scss">
.reactor-main {
  display: flex;
  height: 100%;
}

.reactor-col-left {
  background-color: lightgrey;
  height: 100%;
}

.reactor-col-right{
  background-color: skyblue;
  height: 100%;
}

.nav {
  background: tomato;
}

</style>
