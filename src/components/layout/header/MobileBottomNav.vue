<template>
  <div class="bottom_nav">
    <div class="bottom_nav_buttons">
      <base-button link to="/work"><img src="@/assets/icons/work_icon.svg" alt="work icon"> <span>Work</span> </base-button>
    </div>
    <div class="bottom_nav_buttons">
      <base-button link to="/about"><menu-icon /> <img src="@/assets/icons/profile_icon.svg" alt="profile icon"> <span>About</span></base-button>
    </div>
    <div class="bottom_nav_buttons">
      <base-button link to="/contact"> <img src="@/assets/icons/contact_icon.svg" alt="Hire me Icon"><span>Hire Me</span></base-button>
    </div>
    
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.bottom_nav {
  position: fixed;
  bottom: 0;
  width: 100vw;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  height: $headerHeight;
  font-size: $text-primary;
  font-family: $font-primary;
  align-items: center;
  justify-items: center;
  background-color: $color-secondary;
  

 
}
.bottom_nav_buttons {
    
    display: grid;
    
    align-items: center;
    justify-items: center;
    width: 100%;
    height: 100%;
    // border-top:1px solid $border-primary;
    a {
        color: $color-primary-light;
        display: grid;
        grid-gap: 0.5rem;
        justify-items: center;
    }
}

</style>
