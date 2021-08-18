<template>
  <div>
    <section class="project-visual-presentation">
      <div class="project-visual-conteiner">
        <img
          :src="require(`@/assets/images/${projectImage}.jpg`)"
          :alt="title"
        />
        <!-- <img
        src="https://source.unsplash.com/user/markusspiske/1000x500"
        alt=""
      /> -->
      </div>
    </section>
    <section class="project-info">
      <h3>Project</h3>
      <h1 class="project-title">{{ projectTitle }}</h1>
      <div>
        <ul class="skill-list">
          <base-skill-badge
            v-for="skill in filteredSkills"
            :key="skill"
            :skills="skill"
          ></base-skill-badge>
        </ul>
      </div>

      <div class="project-description">
        <h3>About</h3>
        <div class="project-description-container">
          <p v-for="desc in prjDescription" :key="desc" :description="desc">
            {{ desc }}
          </p>
        </div>
      </div>
    </section>
    <section class="call-to-action">
      <div class="cta-buttons">
        <base-button
          class="action-button"
          link
          :to="prjLiveSiteLink"
          mode="outline"
          ><img
            src="@/assets/icons/demo.svg"
            alt="demo icon"
          />demo</base-button
        >
        <base-button
          class="action-button"
          :to="prjGithubLink"
          link
          mode="outline"
          ><img
            src="@/assets/icons/code.svg"
            alt="code icon"
          />Code</base-button
        >
      </div>
    </section>
  </div>
</template>
<script>
import BaseSkillBadge from '../../components/ui/BaseSkillBadge.vue';
export default {
  props: ['id'],
  components: {
    BaseSkillBadge
  },
  data() {
    return {
      selectedWork: null
    };
  },
  computed: {
    projectTitle() {
      return this.selectedWork.title;
    },
    projectDescription() {
      return this.selectedWork.description;
    },
    projectImage() {
      return this.selectedWork.image;
    },
    filteredSkills() {
      return this.selectedWork.skills;
    },
    prjDescription() {
      return this.selectedWork.description;
    },
    prjLiveSiteLink() {
      return this.selectedWork.liveSite;
    },
    prjGithubLink() {
      return this.selectedWork.githubLink;
    }
  },

  created() {
    this.selectedWork = this.$store.getters['works/works'].find(
      work => work.id === this.id
    );
  }
};
</script>

<style lang="scss" scoped>
.project-visual-presentation,
.project-info,
.call-to-action {
  width: 100%;
  @include respond(phone) {
    width: 100%;
    max-width: 100vw;
    overflow: hidden;
  }
}

.project-visual-container {
  width: 100%;
  height: 50rem;
  img {
    width: 100%;
    max-width: 100%;
    overflow: hidden;
    height: auto;
  }
}
h1,
h3,
ul {
  font-family: $font-primary;
  margin-top: 1rem;
}
h1 {
  font-size: $heading-primary;
  text-transform: uppercase;
  font-weight: 500;
}
h3 {
  color: $color-secondary;
  font-size: $heading-tertiary;
}
p {
  margin-top: 1rem;
  line-height: 1.2;
  font-family: $font-secondary;
  width: 60%;
  @include respond(phone) {
    width: 100%;
  }
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
  font-size: $text-small;
  margin-right: 1rem;
}
.call-to-action {
  margin-top: 2rem;
  margin-bottom: 4rem;
  .cta-buttons {
    display: grid;
    grid-gap: 1rem;
    grid-auto-flow: column;
    justify-content: start;
  }
  .action-button {
    font-size: $text-extra;
    font-family: $font-primary;
    padding: 0.5rem;
    width: 10rem;
    display: grid;
    grid-gap: 0.5rem;
    grid-auto-flow: column;
    align-items: center;
    justify-content: start;
  }
}
</style>
