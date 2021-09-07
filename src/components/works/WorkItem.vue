<template>
  <li>
    <base-button
      @mouseover="hover = true"
      @mouseleave="hover = false"
      class="work-thumbnail"
      link
      :to="selectedWorkDetails"
    >
      <div class="thumbnail-wrapper">
        <base-flashing-border>
          <div class="thumbnail-content">
            <h3>{{ projectTitle }}</h3>
            <div class="thumbnail-project-description">
              <h4>{{ projectDescription }}</h4>
            </div>
            <ul class="skill-list">
              <base-skill-badge
                v-for="skill in skills"
                :key="skill"
                :skills="skill"
              ></base-skill-badge>
            </ul>
          </div>
        </base-flashing-border>
      </div>
      <!-- <img :src="require(`@/assets/images/${projectImage}.jpg`)" :alt="title" /> -->
    </base-button>
  </li>
</template>
<script>
import BaseButton from '../ui/BaseButton.vue';
import BaseSkillBadge from '../../components/ui/BaseSkillBadge.vue';
import BaseFlashingBorder from '../ui/BaseFlashingBorder.vue';
export default {
  components: { BaseButton, BaseSkillBadge, BaseFlashingBorder },
  props: ['id', 'title', 'image', 'shortDescription', 'skills'],
  data() {
    return {
      hover: false
    };
  },
  computed: {
    projectTitle() {
      return this.title;
    },
    projectDescription() {
      return this.shortDescription;
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
  border-radius: 0.8rem;
  display: block;
  height: 22.5rem;
  width: 47.5rem;
  transition: all ease-in-out 0.3s;
  // box-shadow: 0px 5px 13px -5px #000000, 5px 5px 15px -7px rgba(255,255,255,0);
  @include respond(tab-port) {
    height: 32.5rem;
    width: 100%;
  }
  @include respond(phone) {
    width: 100%;
    aspect-ratio: 1;
  }
}
.thumbnail-content {
  height: 100%;
  display: grid;
}
.thumbnail-wrapper {
  // padding: 2rem;
  height: 100%;
  position: relative;
}
h3 {
  margin-bottom: 1rem;
  margin-top: 1rem;
  font-family: $font-primary;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 0.05em;
}
.thumbnail-project-description {
  height: 7.5rem;
}
h4 {
  font-size: $text-primary;
  color: $color-secondary;
  font-family: $font-secondary;
}
ul.skill-list {
  height: 5.5rem;
  max-height: 5.5rem;
  list-style: none;
  padding: 0;
  display: grid;
  grid-gap: 0.5rem;
  grid-template-columns: repeat(4, auto);
  justify-content: start;
  align-self: end;
  font-size: $text-small;
  margin-right: 1rem;
}
</style>
