<template>
  <div class="reactor">
    <!-- <div class="test">
      <div class="tchild">
        hello
      </div>
      <div class="tchild left">
        hello
      </div>
    </div> -->
    <div class="reactor-col-left">
      left
    </div>
    <div class="reactor-col-right">
      right
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
.test {
  display: flex;
  height: 100%;
  width: 100%;
};

.tchild {
  background-color: skyblue;
  width: 50%;
  height: 100%;
}
.left {
  background-color: tomato;
}
.reactor {
  display: grid;
  height: 100%;
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
  background: tomato;
}

</style>
