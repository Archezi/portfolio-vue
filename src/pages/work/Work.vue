<template>
  <div id="work-wrapper">
    <h2>new Projects()</h2>
    <work-list></work-list>
    <div class="about_link">
      <base-button class="link" link mode="call-to-action" to="/about"
        >Learn more about me ></base-button
      >
    </div>
  </div>
</template>

<script>
import WorkList from './WorkList.vue';
export default {
  components: {
    WorkList
  },
  data() {
    return {
      dialogWindow: false
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>

<style lang="scss" scoped>
#work-wrapper {
  position: relative;
  height: 100%;
  @include respond(phone) {
    padding: 0;
  }
}
.about_link {
  margin-top: 4rem;
}
h2 {
  padding: 2rem 0;
  font-size: $heading-primary;
  font-family: $font-secondary;
}
</style>
