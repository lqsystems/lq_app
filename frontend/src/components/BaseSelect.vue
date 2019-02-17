<template>
  <v-select
    v-bind:items="items"
    v-bind:label="label"
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
