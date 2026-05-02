<template>
  <div class="not-found">
    <h2>404 {</h2>
    <p>Page not found.</p>
    <router-link to="/">&#8592; back to home</router-link>
    <h2>}</h2>
  </div>
</template>

<script>
export default {
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>

<style lang="scss" scoped>
.not-found {
  border-left: 1px solid $border-primary;
  padding-left: 2rem;
  padding-top: 2rem;

  h2 {
    font-size: $heading-primary;
    font-family: $font-primary;
    font-weight: 600;
    margin-bottom: 2rem;
  }

  p {
    font-family: $font-secondary;
    font-size: $text-extra;
    color: $color-primary-dark;
    margin-bottom: 2rem;
  }

  a {
    font-family: $font-secondary;
    font-size: $text-small;
    color: #7c4ff5;
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover { color: $color-primary-light; }
  }
}
</style>
