<template>
  <div
    class="dropdown"
  >
    <span
      class="dropbtn icon-dots"
      @click="toggle"
    />
    <BaseCard
      ref="dropdownContent"
      class="dropdown-content"
      :class="[ open ? 'is-open' : 'is-closing' ]"
    >
      <slot />
    </BaseCard>
  </div>
</template>

<script>
import BaseCard from '@/components/BaseCard';

export default {
  name: 'BaseDropdown',
  components: {
    BaseCard,
  },
  data() {
    return {
      open: false,
    };
  },
  methods: {
    toggle() {
      if (!this.open) {
        this.open = true;
        window.addEventListener('click', this.closeDropdownOnWindowClick, true);
      } else {
        this.open = false;
      }
    },
    closeDropdownOnWindowClick(evt) {
      if (this.open && this.$refs.dropdownContent) {
        const dropdownClicked = evt.target.parentNode === this.$refs.dropdownContent.$el;

        if (dropdownClicked) {
          setTimeout(() => {
            this.open = false;
          }, 400);
        } else {
          this.open = false;
          window.removeEventListener('click', this.closeDropdownOnWindowClick);
          evt.stopPropagation();
        }
      }
    },
  },
};
</script>

<style lang='scss'>
@import "../styles/variables";

.dropbtn {
  color: white;
  padding: 16px;
  cursor: pointer;
}

.dropdown {
  font-size: 1em;
  position: relative;
  display: inline-block;
}

.dropdown-content {
  &.card {
    padding: 0;
    background-color: lighten($panel-background-color, 2);
  }
  position: absolute;
  right: 0;
  min-width: 160px;
  z-index: 1000;
}

$transition-time: .1s;

.is-open {
  opacity: 1;
  visibility: visible;
  transform: scale(1);
  transition: all $transition-time;
}

.is-closing {
  visibility: hidden;
  opacity: 0;
  transform: scale(.9);
  transition: all $transition-time;
}

.dropdown-content a {
  color: white;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {
  background-color: lighten($panel-background-color, 20);
}

</style>
