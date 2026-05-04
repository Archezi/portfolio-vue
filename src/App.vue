<template>
  <div class="wrapper">
    <the-header></the-header>
    <cookie-banner></cookie-banner>
    <div class="container">
      <router-view v-slot="slotProps">
        <transition name="route" mode="out-in">
          <component :is="slotProps.Component"></component>
        </transition>
      </router-view>
    </div>
  </div>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue';
import CookieBanner from './components/ui/CookieBanner.vue';
export default {
  components: {
    TheHeader,
    CookieBanner
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700&display=swap');
@import url('https://fonts.google.com/share?selection.family=Roboto%20Mono:wght@300;400;700');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', 'Roboto Mono' sans-serif;
}
::-webkit-scrollbar {
  width: 5px;
}
::-webkit-scrollbar-thumb {
  background: $border-primary;
}
body {
  margin: 0;
  background-color: $background-primary;
}
.wrapper {
  position: relative;
  min-height: $containerHeight;
  // height: 100vh;
  max-width: 100vw;
  padding-top: $headerHeight;
  padding-bottom: $headerHeight;
  @include respond(tab-port) {
    width: 100vw;
  }
  @include respond(phone) {
    width: 100vw;
    min-height: 100vh;
  }
}
.container {
  position: relative;
  width: 100rem;
  max-width: 100vw;
  padding: 0 2rem;
  height: 100%;
  min-height: $containerHeight;
  padding: $headerHeight 0 0 0;
  margin: 0 auto;
  @include respond(tab-land) {
    width: 100vw;
    padding: 0 2rem;
  }
  @include respond(tab-port) {
    width: 100vw;
    padding: 0 2rem;
  }
  @include respond(phone) {
    width: 100%;
    max-width: 100vw;
    padding: 0 2rem;
  }
}
.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.route-leave-active {
  transition: opacity 0.3s ease-in, transform 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
