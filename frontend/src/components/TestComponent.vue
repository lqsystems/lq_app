<template>
  <div class="test-wrapper">
    Hola Mundo
  </div>
</template>

<script>
import callApi from '@/utils/api.utils.js';

const fetchDataPoints = async () => {
  const { data } = await callApi(url);
  console.log(data);
};

export default {
  name: 'Test',
  components: {
  },
  created() {
    // fetchDataPoints();
  },
};

</script>

<style>
</style>
