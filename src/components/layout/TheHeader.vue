<template>
  <header class="header">
    <div @mouseenter="hover = true" @mouseleave="hover = false" class="logo">
      <transition name="fade" mode="out-in">
        <base-button class="logo_binary" v-if="!hover" link to="/">
          <h1 id="logo">01001100/01001011</h1>
        </base-button>
        <base-button class="logo_non-binary" v-else link to="/">
          <h1 id="logo">LK</h1>
        </base-button>
      </transition>
    </div>
    <div class="nav_mobile">
      <div class="logo_mobile">
        <base-button class="mobile_only" link to="/">
          <h1 id="logo">LK</h1>
        </base-button>
      </div>
    </div>
    <main-navigation class="hide_mobile"></main-navigation>
    <div v-if="mobileView" class="menu_icon">
      <transition name="fade" mode="out-in">
        <base-button
          @click="openMobileNavigation"
          v-if="!mobileNavOpen"
          class="link "
          ><img src="@/assets/icons/menu_icon.svg" alt="menu icon"
        /></base-button>
        <base-button @click="closeMobileNavigation" v-else  class="link "
          ><img src="@/assets/icons/close_icon.svg" alt="menu icon"
        /></base-button>
      </transition>
    </div>
  </header>
  <transition name="fade" mode="out-in">
    <mobile-navigation
      :class="{ openMobileNav: mobileNavOpen, closeMobileNav: !mobileNavOpen }"
      class=" mobile_only "
      @toggle-navigation="closeMobileNavigation"
    ></mobile-navigation>
  </transition>
</template>

<script>
import BaseButton from '../ui/BaseButton.vue';
import MainNavigation from './header/MainNavigation.vue';
import MobileNavigation from './header/MobileNavigation.vue';
export default {
  data() {
    return {
      hover: false,
      mobileNavOpen: false,
      mobileView: true
    };
  },
  components: { BaseButton, MainNavigation, MobileNavigation },
  methods: {
    openMobileNavigation() {
      return (this.mobileNavOpen = true);
    },
    closeMobileNavigation() {
      return (this.mobileNavOpen = false);
    },
    handleView() {
      this.mobileView = window.innerWidth <=700;
    }
  },
  created() {
    this.handleView();
    window.addEventListener('resize', this.handleView);
  }
};
</script>
<style lang="scss">
.openMobileNav {
  transform: translateX(0rem);
  display: block;
  position: absolute;
  height: calc(100vh - 12rem);
  z-index: 999;
  width: 100vw;
  transition: transform 1s ease-in;
}
.closeMobileNav {
  transform: translateX(-60rem);
  display: block;
  position: absolute;
  height: calc(100vh - 12rem);
  z-index: 999;
  width: 100vw;
  transition: transform 0.5s ease-out
}
.header {
  position: fixed;
  box-sizing: border-box;
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
  z-index: 999;
  @include respond(phone) {
    width: 100vw;
  }
}
.nav_mobile_nav {
  transform: translateX(-60rem);
  transition: 1s transform ease-in-out;
  z-index: 999;
}
.mobile_nav_open {
  right: 0;
}
.nav {
  width: 50rem;
  height: 100%;
}
ul {
  display: flex;
  justify-content: space-evenly;
  height: 100%;
  align-items: center;
}
.logo {
  height: 100%;
  width: 25rem;
  display: flex;
  align-items: center;
  @include respond(phone) {
    display: none;
  }
  a {
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: flex-start;
  }
}
.nav_mobile {
  display: none;
  @include respond(phone) {
    display: block;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.fade-enter-to {
  opacity: 1;
}
.link {
  background-color: transparent;
  border: none;
}
</style>
