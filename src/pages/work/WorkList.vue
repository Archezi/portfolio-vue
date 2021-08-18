<template>
    <ul>
      <work-item
        v-for="work in filteredWorks"
        :key="work.id"
        :title="work.title"
        :id="work.id"
        :short-description="work.shortDescription"
        :skills="work.skills"
      ></work-item>
    </ul>
    
</template>

<script>
import WorkItem from '../../components/works/WorkItem.vue';
export default {
  components: {
    WorkItem
  },
  computed: {
    filteredWorks() {
      return this.$store.getters['works/works'];
    }
  }
};
</script>

<style lang="scss" scoped>
ul { 
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 5rem;
  
  @include respond(tab-port) {
    grid-template-columns: 1fr 1fr;
    grid-gap: 2.5rem
  }
  @include respond(phone) {
    grid-template-columns: 1fr;
  }
}

</style>
