<template>
  <div class="box">
    <div class="animated-box">
      <span></span>
      <span></span>
    </div>
    <div class="box__wrapper">
        <slot></slot>
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>

  $color-first: #2B85E7;
  $color-second: #7eaada;
  $color-third: #7eaada;
  $color-forth: #2B85E7;
  $block-width: 100% ;
  $block-height: 100%;
  $border-width: 0.4rem;
  $border-radius-outer: 8px;
  $border-radius-inner: calc(($border-radius-outer) / 2);
  

  



.animated-box {
    // visibility: hidden;
  width: 100%;
  height: 100%;
  animation: o-rotate-360 linear 8s infinite;
    &:hover {
       visibility: show;
    }
  span {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    transform: translate(-50%, -50%);

    &:after {
      display: block;
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      left: 100%;
    }

    &:first-child {
      background: $color-first;
      filter: blur(2rem);

      &:after {
        background: $color-second;
      filter: blur(2rem);

      }
    }

    &:last-child {
      background: $color-third;
      filter: blur(2rem);
      &:after {
        background: $color-forth;
      filter: blur(2rem);

      }
    }
  }
}
// component

.box {
  
  width: $block-width;
  height: $block-height;
  border: 2px  solid  $border-secondary;
  overflow: hidden;
  position: relative;
  box-shadow: 0 10px 40px -10px rgba(0, 64, 128, 0.2);
  border-radius: $border-radius-outer;

  &__wrapper {
    width : calc(100% - #{$border-width});
    height: calc(100% - #{$border-width});
    position: absolute;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    background: $color-dark;
    padding: 1.2rem 1rem 1.8rem;
    display: flex;
    flex-direction: column;
    border-radius: $border-radius-inner;
  }
}

// Objects

@keyframes o-rotate-360 {
  0% { transform: rotate(0) }

  100% { transform: rotate(360deg) }
}
</style>
