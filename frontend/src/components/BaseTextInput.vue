<template>
  <input
    v-model="message"
    placeholder="edit me"
  >
</template>


<script>
export default {
  name: 'BaseCard',
};
</script>

<style lang='scss' scoped>
@import "../styles/variables";

.card {
  padding: 1em;
  background-color: $panel-background-color;
  border: 1px solid $steel-blue-transparent;
  border-radius: 5px;
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.1);
}
</style>
