<template>
  <div id="work-wrapper">
    <h2>new Projects()</h2>
    <work-list></work-list>
  </div>
</template>

<script>
import WorkList from './WorkList.vue';
export default {
  components: {
    WorkList,
  },
  data() {
      return {
          dialogWindow: false
      }
  }
};
</script>

<style lang="scss" scoped>
#work-wrapper {
   position: relative;
   height: 100%;
   @include respond(phone) {
     padding: 2rem;
   }
}

h2 {
  padding: 2rem 0;
  font-size: $heading-primary;
  font-family: $font-secondary;
}
ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
  @include respond(phone) {
     grid-template-columns: 1fr;
     li {
       width: 100%;
     }
   }
}

</style>
