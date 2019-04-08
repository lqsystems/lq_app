<template>
  <v-dialog
    ref="dialog"
    v-model="modal"
    dark
    :return-value.sync="time"
    persistent
    lazy
    full-width
    width="290px"
  >
    <v-text-field
      slot="activator"
      v-model="ampmTime"
      dark
      prepend-icon="access_time"
      readonly
    />
    <v-time-picker
      v-if="modal"
      v-model="time"
      dark
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
@import '../styles/variables';

.v-text-field__slot {
  input {
    text-align: center;
  }
}

.theme--dark.v-icon {
    color: $font-color-medium-contrast;
}

.theme--dark.v-input:not(.v-input--is-disabled) {
  input {
    color: $font-color-medium-contrast;
  }
}

.v-text-field {
  padding-top: 0;
  margin-top: 0;
}

.v-input__slot {
  margin-bottom: 0;
}
</style>
