<template>
  <div class="runs view">
    <BaseHeader
      back-icon
      :handle-icon-click="routeToControls"
    />
    <img
      class="runs-table-mock"
      src="@/assets/runs-table.png"
      alt="run table"
      @click="routeToHistory"
    >
  </div>
</template>

<script>
import router from '@/router';

import BaseHeader from '@/components/BaseHeader';

export default {
  name: 'Runs',
  components: {
    BaseHeader,
  },
  methods: {
    routeToHistory() {
      router.push('/history');
    },
    routeToControls() {
      router.push('/controls');
    },
  },
};
</script>

<style scoped lang="scss">
.runs-table-mock {
  margin: 0 auto;
  display: block;
  width: 880px;
  margin-top: 3%;
}
</style>
