<template>
  <li>
    <base-button class="work-thumbnail" link :to="selectedWorkDetails">
      <h3>{{ workTitle }}</h3>
      <img :src="require(`@/assets/images/${projectImage}.jpg`)" :alt="title" />
    </base-button>
  </li>
</template>
<script>
import BaseButton from '../ui/BaseButton.vue';
export default {
  components: { BaseButton },
  props: ['id', 'title', 'image'],
  computed: {
    workTitle() {
      return this.title;
    },
    projectImage() {
      return this.image;
    },
    workId() {
      return this.id;
    },
    selectedWorkDetails() {
      return this.$route.path + '/' + this.id;
    }
  }
};
</script>
<style lang="scss" scoped>
.work-thumbnail {
  font-size: 32px;
  font-family: $font-primary;
  position: relative;
  background-color: $background-primary;
  display: block;
  height: 45rem;
  width: 45rem;
  transition: all ease-in-out 0.3s;
  @include respond(phone) {
    width: 100%;
    height: auto;
  }
  &:hover {
    img {
      opacity: 0.6;
    }
    h3 {
      opacity: 1;
      font-size: $heading-primary;
      color: white;
      
    }
  }
  img {
    opacity: 0.5;
    width: 100%;
    height: auto;
    overflow: hidden
  }

  h3 {
    @include absCenter;
    opacity: 0;
  }
}


</style>
