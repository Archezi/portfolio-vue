<template>
  <div class="intro-container">
    <h2>Hi, I am Lukasz Kaczmarek</h2>
    <h3>Frontend developer base in Dublin</h3>
    <base-button class="link" link mode="call-to-action" to="/work">
      My work >
    </base-button>
    <div class="test-box"></div>
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
.intro-container {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  padding: 2rem;
}

h2 {
  font-size: $heading-primary;
  font-family: $font-primary;
  color: #fff;
  font-weight: bold;
}
h3 {
  font-size: $heading-secondary;
  color: $color-primary-dark;
  font-family: $font-secondary;
  line-height: 1.6;
}
.link {
  margin: 5rem 0 0 0;
}
</style>
