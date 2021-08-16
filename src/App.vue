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
    <mobile-bottom-nav v-if="mobileView" key="mobileBottomNav"></mobile-bottom-nav>
  </div>
</template>

<script>
import MobileBottomNav from './components/layout/header/MobileBottomNav.vue';
import TheHeader from './components/layout/TheHeader.vue';
export default {
  components: {
    TheHeader,
    MobileBottomNav
  },
  data() {
    return {
      mobileView: false,
    }
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 700;
    }
  },
  created() {
    this.handleView();
    window.addEventListener('resize', this.handleView);
  }
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');
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
  padding-top: $headerHeight;
  padding-bottom: $headerHeight;
  @include respond(phone) {
    width: 100vw;
    min-height: 100vh;
  }
}
.container {
  position: relative;
  width: 100rem;
  height: 100%;
  min-height: $containerHeight;
  padding: $headerHeight 0 0 0;
  margin: 0 auto;
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
