<template>
  <div class="card">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
};

</script>

<style>
 .card {
  border-radius: 3px;
  box-shadow: 0 1px 20px 0 rgba(0,0,0,.1);
 }
</style>
