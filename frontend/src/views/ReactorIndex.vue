<template>
  <div class="reactor-index">
    <div class="reactor-card-wrapper">
      <ReactorIndexCard />
    </div>
  </div>
</template>

<script>
import ReactorIndexCard from '@/components/ReactorIndexCard';

export default {
  name: 'ReactorIndex',
  components: {
    ReactorIndexCard,
  },
};
</script>

<style scoped lang="scss">
.reactor-index {
  color: lightgrey;
}

.reactor-card-wrapper {
  width: 50%;
  margin: 20% auto;
}
</style>
