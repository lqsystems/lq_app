<template>
  <v-app>
    <transition
      name="router-animation"
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <router-view />
    </transition>
  </v-app>
</template>

<script>
import { mapActions } from 'vuex';
import { normalize, schema } from 'normalizr';
import { FETCH_MODULES } from '@/store/actions.types.js';
import mockDataModules from '@/data/mockDataModules';

const mockData = [
  {
    id: 'ZeePrime',
    reactions: [
      {
        id: 1,
        name: 'spirulina',
        medium: 'MEA',
      },
      {
        id: 2,
        name: 'fusarium',
        medium: 'minerals',
      },
    ],
  },
  {
    id: 'Dosis',
    reactions: [
      {
        id: 3,
        name: 'apples',
        medium: 'juice',
      },
      {
        id: 4,
        name: 'bread',
        medium: 'butter',
      },
    ],
  },
];

const reaction = new schema.Entity('reactions');
const module = new schema.Entity('modules', {
  reactions: [reaction],
});

const moduleArray = [module];
const normalizedData = normalize(mockData, moduleArray);


export default {
  name: 'App',
  async created() {
    // TODO: fix this weird syntax
    this[FETCH_MODULES]();
  },
  methods: {
    ...mapActions([FETCH_MODULES]),
  },
};
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css");

* {
  box-sizing: border-box;
}

html, body {
  height: 100vh;
  padding-bottom: 85px;
}

.view {
  position: fixed;
  width: 100%;
}
</style>
