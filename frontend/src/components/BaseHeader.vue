<template>
  <v-toolbar>
    <v-btn
      v-if="backIcon"
      icon
      v-on:click="handleIconClick"
    >
      <v-icon>arrow_back</v-icon>
    </v-btn>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'BaseHeader',
  props: {
    title: {
      type: String,
      required: true,
    },
    backIcon: {
      type: Boolean,
      default: false,
    },
    handleIconClick: {
      type: Function,
      default: () => {},
    },
  },
};
</script>
