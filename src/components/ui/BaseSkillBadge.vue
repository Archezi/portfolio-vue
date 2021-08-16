<template>
  <li>
          {{ skillList }}
  </li>
</template>

<script>
export default {
    props: ['id', 'skills'],

    computed: {
        skillList() {
            return this.skills
        }
    }
}
</script>

<style lang="scss" scoped>
ul li {
        list-style: none;
        display: inline-block;
        font-size: $text-small;
        height: 2.5rem;
        padding: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        @include baseBorder;
        border: 0.1rem solid $border-secondary;;
        color: $color-primary-dark;
        background-color: $background-skill;
        

    }
</style>>
    
