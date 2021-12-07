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
        <div class="img-conteiner">
          <img :src="require(`@/assets/images/${projectImage}`)" :alt="title" />
        </div>
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
      </div>
    </base-button>
  </li>
</template>
<script>
import BaseButton from '../ui/BaseButton.vue';
import BaseSkillBadge from '../../components/ui/BaseSkillBadge.vue';
export default {
  components: { BaseButton, BaseSkillBadge },
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
.thumbnail-wrapper {
  height: 100%;
  position: relative;
  box-shadow: 0px 5px 13px -5px #000000,
    5px 5px 15px -7px rgba(255, 255, 255, 0);
}
.work-thumbnail {
  font-size: 32px;
  font-family: $font-primary;
  position: relative;
  // background-color: $background-primary;
  border-radius: 0.8rem;
  display: block;
  // height: 22.5rem;
  width: 47.5rem;
  transition: all ease-in-out 0.3s;

  @include respond(tab-port) {
    width: 100%;
  }
  @include respond(phone) {
    width: 100%;
  }
}
.img-conteiner {
  position: relative;
  max-width: 100%;
  max-height: 100%;
  img {
    width: 100%;
    height: auto;
  }
}

.thumbnail-content {
  position: relative;
  height: 100%;
  display: grid;
  padding: 2rem;
  h3 {
    margin-bottom: 1rem;
    margin-top: 1rem;
    font-family: $font-primary;
    text-transform: uppercase;
    font-weight: 600;
    letter-spacing: 0.05em;
  }
  .thumbnail-project-description {
    min-height: 7.5rem;
    margin-bottom: 1rem;
  }
  h4 {
    font-size: $text-extra;
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
}
</style>
