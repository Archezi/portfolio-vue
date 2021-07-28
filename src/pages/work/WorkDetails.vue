<template>
  <section class="work-dialog">
    <div class="dialog-wrapper">
      <div class="project-presentation-left">
        <img
          :src="require(`@/assets/images/${projectImage}.jpg`)"
          :alt="title"
        />
      </div>
      <div class="project-info-right">
        <header>
          <h3>Project</h3>
          <h1 class="project-title">{{ projectTitle }}</h1>
            <ul class="skill-list">
              <base-skill-badge
                v-for="skill in filteredSkills"
                :key="skill"
                :skills="skill"
              ></base-skill-badge>
            </ul>
        </header>
        <section class="project-description">
          <h3>About</h3>
          <div class="project-description-container">
            <p v-for="desc in prjDescription" :key="desc" :description="desc">{{ desc }}</p>
          </div>
        </section>

        <div class="prject-actions-buttons">
          <base-button class="action-button" link mode="outline"
            ><img
              src="@/assets/icons/code.svg"
              alt="code icon"
            />Code</base-button
          >
          <base-button class="action-button" link mode="outline"
            ><img
              src="@/assets/icons/demo.svg"
              alt="demo icon"
            />demo</base-button
          >
        </div>
        <!-- <button>close</button> -->
      </div>
    </div>
  </section>
</template>
<script>
import BaseSkillBadge from '../../components/ui/BaseSkillBadge.vue';
// import BaseParagraph from '../../components/ui/BaseParagraph.vue';
export default {
  props: ['id'],
  components: {
    BaseSkillBadge,
    // BaseParagraph
  },
  data() {
    return {
      slectedWork: null
    };
  },
  computed: {
    projectTitle() {
      return this.slectedWork.title;
    },
    projectDescription() {
      return this.slectedWork.description;
    },
    projectImage() {
      return this.slectedWork.image;
    },
    filteredSkills() {
      return this.slectedWork.skills;
    },
    prjDescription() {
      return this.slectedWork.description;
    }
  },

  created() {
    console.log(this.slectedWork);
    this.slectedWork = this.$store.getters['works/works'].find(
      work => work.id === this.id
    );
    console.log(this.slectedWork);
  }
};
</script>

<style lang="scss" scoped>
.work-dialog {
  @include absCenter;
  display: grid;
  grid-template-columns: 1fr;
  min-height: 500px;
  width: 100%;
  box-sizing: border-box;
  background-color: $background-secondary;
  border: 1px solid $border-primary;
}
.dialog-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.project-presentation-left {
  img {
    width: 100%;
    height: 100%;
  }
}
.project-info-right {
  padding: 2rem;
  border-left: 1px solid $border-primary;
  font-family: $font-primary;
  color: $color-primary-light;

  h1,
  h3,
  ul.skill-list,
  .project-description,
  .project-description h4,
  .project-description p,
  .prject-actions-buttons {
    margin-bottom: 2rem;
  }

  header h3 {
    font-size: $text-extra;
    font-family: $font-secondary;
    color: $color-secondary;
    text-transform: uppercase;
    font-weight: 400;
  }
  h1 {
    font-size: $heading-primary;
    font-family: $font-primary;
    font-weight: 700;
  }
  ul.skill-list {
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: flex-start;
    font-size: $text-small;
    margin-right: 1rem;
  }
}
.project-description h3 {
  font-size: $text-extra;
  font-family: $font-secondary;
  text-transform: uppercase;
  font-weight: 400;
  color: $color-secondary;
}
.project-description-container {
  height: 22rem;

  p {
    margin-bottom: 2rem;
    color: $color-primary-dark;
  }
}

.prject-actions-buttons {
  display: flex;

  .action-button {
    font-size: $text-primary;
    padding: 0.5rem 1rem;
    text-transform: lowercase;
    display: flex;
    align-content: center;
    margin-right: 1rem;

    img {
      height: 1.6rem;
      width: auto;
      padding-right: 1rem;
    }
  }
}
</style>
