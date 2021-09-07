<template>
  <button v-if="!link" :class="mode">
    <slot></slot>
  </button>
  <router-link v-else :to="to" :class="mode">
    <slot></slot>
  </router-link>
</template>
<script>
export default {
  props: {
    mode: {
      type: String,
      required: false,
      default: null
    },
    link: {
      type: Boolean,
      required: false,
      default: false
    },
    to: {
      type: String,
      required: false,
      default: '/'
    }
  }
};
</script>

<style lang="scss" scoped>
button,
a {
  text-decoration: none;
  font: inherit;
  // border: 1px solid $background-light;
  color: $color-primary-dark;
  cursor: pointer;
  display: inline-block;
  transition: all 0.3s ease-out;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: transparent;
  border-color: $border-secondary;
  color: $color-primary-light;
}

.call-to-action {
  background-color: transparent;
  color: $color-secondary;
  border: none;
  font-family: $font-secondary;
  font-size: $text-extra;
  height: 2rem;
  display: flex;
  align-items: center;
}
.filled {
  background-color: $color-secondary;
}
.outline {
  background-color: transparent;
  border: 1px solid $border-secondary;
  color: $color-primary-dark;
  border-radius: 0.5rem;
}
.outline-link {
  // color: $white;
  // background-color: $link-color;
  width: 15rem;
}
.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  color: $color-primary-light;
  border-color: $color-primary-light;
}
</style>
