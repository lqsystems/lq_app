<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    :return-value.sync="time"
    persistent
    lazy
    full-width
    width="290px"
  >
    <v-text-field
      slot="activator"
      v-model="ampmTime"
      prepend-icon="access_time"
      readonly
    />
    <v-time-picker
      v-if="modal"
      v-model="time"
      full-width
    >
      <v-spacer />
      <v-btn
        flat
        color="primary"
        @click="modal = false"
      >
        Cancel
      </v-btn>
      <v-btn
        flat
        color="primary"
        @click="$refs.dialog.save(time)"
      >
        OK
      </v-btn>
    </v-time-picker>
  </v-dialog>
</template>

<script>
import { convertToAmPm } from '@/utils/time.utils';

export default {
  name: 'BaseTimePicker',
  props: {
    initialTime: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      time: this.initialTime,
      modal: false,
    };
  },
  computed: {
    ampmTime: {
      get() {
        return convertToAmPm(this.time);
      },
    },
  },
};
</script>

<style lang="scss">
.v-text-field__slot {
  input {
    text-align: center;
  }
}
</style>
