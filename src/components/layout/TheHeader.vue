<template>
  <header class="header">
    <div class="logo">
      <base-button link to="/"><h1>01001100/01001011</h1></base-button>
    </div>
    <nav class="nav">
      <ul>
        <li>
          <router-link to="/">./home</router-link>
        </li>
        <li>
          <router-link to="/work">./work</router-link>
        </li>
        <li>
          <router-link to="/about">./about</router-link>
        </li>
        <li>
          <router-link to="/contact">./contact</router-link>
        </li>
        <li>
          <a href="https://github.com/Archezi" target="_blank"><img src="@/assets/icons/github.svg" alt=""></a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script>
import BaseButton from '../ui/BaseButton.vue';
export default {
  components: { BaseButton }
};
</script>

<style lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: $headerHeight;
  background: $background-main;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 4rem;
  font-size: $text-extra;
  font-family: $font-secondary;
}
.nav {
  width: 50rem;
}
ul {
  display: flex;
  justify-content: space-evenly;
}
</style>
