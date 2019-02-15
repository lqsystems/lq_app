<template>
  <div class="test-wrapper">
    <HeaterControlPanel />
  </div>
</template>

<script>
import NoUiSlider from './NoUiSlider';
import HeaterControlPanel from './HeaterControlPanel';

export default {
  name: 'Test',
  components: {
    NoUiSlider,
    HeaterControlPanel,
  },
};

</script>

<style>
.test-wrapper {
  padding-left: 20%;
  margin-top: 50px;
  width: 600px;
}

.test-card {
  padding: 20px;
}
</style>
