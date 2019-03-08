<template>
  <v-select
    :items="items"
    :label="label"
    color="darkgrey"
  />
</template>

<script>
export default {
  name: 'BaseSelect',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    items: ['Reaction 1', 'Reaction 2'],
  }),
};
</script>

<style>
</style>
