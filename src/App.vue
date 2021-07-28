<template>
  <div class="wrapper">
    <the-header></the-header>
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
export default {
  components: {
    TheHeader
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import url('https://fonts.google.com/share?selection.family=Roboto%20Mono:wght@300;400;700');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', 'Roboto Mono' sans-serif;
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
  max-width: 100vw;
  padding-top: 8rem;
  padding-bottom: 8rem;
  @include respond(phone) {
   
    width: 100vw;
    height: 100vh;
  }
}
.container {
  position: relative;
  width: 100rem;
  height: 100%;
  min-height: $containerHeight;
  padding: 8rem 0 0 0;
  margin: 0 auto;
  @include respond(phone) {
    width: 100%;
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
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
