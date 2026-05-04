<template>
  <div v-if="visible" class="cookie-banner">
    <p>
      This site uses Google Analytics to see how many people visit.
      No personal data is sold or shared.
      <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Learn more</a>
    </p>
    <button @click="dismiss">Got it</button>
  </div>
</template>

<script>
const STORAGE_KEY = 'cookie_banner_dismissed';

export default {
  data() {
    return {
      visible: !localStorage.getItem(STORAGE_KEY)
    };
  },
  methods: {
    dismiss() {
      localStorage.setItem(STORAGE_KEY, '1');
      this.visible = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2.4rem;
  padding: 1.2rem 2.4rem;
  background-color: $background-secondary;
  border-top: 1px solid $border-secondary;

  p {
    font-family: $font-secondary;
    font-size: $text-extra-small;
    color: $color-primary-dark;
    margin: 0;

    a {
      color: #7c4ff5;
      text-decoration: none;
      &:hover { color: $color-primary-light; }
    }
  }

  button {
    font-family: $font-secondary;
    font-size: $text-extra-small;
    color: $color-primary-dark;
    background: none;
    border: 1px solid $border-secondary;
    padding: 0.4rem 1.2rem;
    border-radius: 2px;
    cursor: pointer;
    white-space: nowrap;
    transition: border-color 0.2s ease, color 0.2s ease;

    &:hover {
      border-color: #7c4ff5;
      color: $color-primary-light;
    }
  }

  @include respond(phone) {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
