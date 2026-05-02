<template>
  <div class="skills-grid">
    <div class="skill-category" v-for="category in categories" :key="category.name">
      <h4>{{ category.name }}</h4>
      <div class="chip-list">
        <span class="chip" v-for="skill in category.skills" :key="skill">{{ skill }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.skills-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.6rem;
  margin-bottom: 2rem;

  @include respond(phone) {
    grid-template-columns: 1fr;
  }
}

.skill-category {
  background-color: $background-skill;
  border: 1px solid $border-secondary;
  padding: 1.8rem;
  border-radius: 2px;

  h4 {
    display: block;
    font-family: $font-primary;
    font-size: $text-extra-small;
    color: #7c4ff5;
    margin-bottom: 1.2rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.07em;
  }
}

.chip-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.chip {
  display: inline-block;
  font-family: $font-secondary;
  font-size: $text-extra-small;
  color: $border-primary;
  background-color: $background-secondary;
  border: 1px solid $border-secondary;
  padding: 0.3rem 0.8rem;
  border-radius: 2px;
  white-space: nowrap;
}
</style>
