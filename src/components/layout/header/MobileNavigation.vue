<template>
  <div class="">
    <div class="mobile_nav_container">
      <nav class="mobile_navigation">
        <span class="mobile_navigation_span">navigation: {</span>
        <ul>
          <li>
            <router-link @click="toogleMobileNavigation" to="/home">home,</router-link>
          </li>
          <li>
            <router-link @click="toogleMobileNavigation" to="/work">work,</router-link>
          </li>
          <li>
            <router-link @click="toogleMobileNavigation" to="/about">about,</router-link>
          </li>
          <li>
            <router-link @click="toogleMobileNavigation" to="/contact">contact</router-link>
          </li>
        </ul>
        <span class="mobile_navigation_span">}</span>
      </nav>
      <div class="mobile_nav_bottom_section">
        <div class="social_links">
          <a href="https://github.com/Archezi" target="_blank"
            ><img src="@/assets/icons/github.svg" alt="github icon"
          /></a>
          <a href="https://github.com/Archezi" target="_blank"
            ><img src="@/assets/icons/linkedin.svg" alt="linkedin icon"
          /></a>
        </div>
        <div class="legal">
          <span
            >© 2021 All Rights Reserved. Developed by
            <span class="legal_highlight">Lukasz Kaczmarek.</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['mobileNavOpen'],
  
  methods: {
    toogleMobileNavigation() {
      this.$emit('toggle-navigation')
    }
  },
  
}
</script>
<style lang="scss" scoped>
.mobile_nav_container {
  position: absolute;
  top: 0rem;
  left: 0;
  display: grid;
  padding: 0 4rem;
  width: 100%;
  max-height: 100vh;
  height: calc(100% - #{$headerHeight});
  height: 100%;
  font-family: $font-secondary;
  color: $color-primary-dark;
  background-color: $background-main;
  z-index: 999;
}
nav {
  position: relative;
  display: grid;
  padding-top: 4rem;
}
.mobile_navigation_span {
  display: block;
  font-size: $text-extra;
  padding-bottom: 2rem;
}
// span {
//
// }
ul {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 2rem 0;
}
li {
  width: 100%;
  padding: 2rem 5rem 2rem;
  font-size: $text-extra;
}
.mobile_nav_bottom_section {
  position: relative;
  bottom: 0;
  width: 100%;
  height: 25rem;
}
.social_links {
  position: absolute;
  bottom: 10rem;
  a {
    padding-right: 2rem;
  }
}
.legal {
  position: absolute;
  bottom: 2rem;
}
.legal span {
  font-size: $text-extra-small;
  font-family: $font-primary;
  display: block;
  line-height: 1.6;
}
.legal_highlight {
  color: $color-primary-light;
}
</style>
