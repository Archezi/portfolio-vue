<template>
  <aside class="side-nav">
    <span class="side-nav__title">// contents</span>
    <ul>
      <li v-for="section in sections" :key="section.id">
        <a
          :href="'#' + section.id"
          :class="{ active: activeSection === section.id }"
          @click.prevent="scrollTo(section.id)"
        >
          <span class="side-nav__number">{{ section.number }}</span>
          <span class="side-nav__label">{{ section.label }}</span>
        </a>
      </li>
    </ul>
  </aside>
</template>

<script>
export default {
  props: {
    sections: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      activeSection: '',
      observer: null
    };
  },
  mounted() {
    this.activeSection = this.sections[0]?.id ?? '';

    this.observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        });
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    this.sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) this.observer.observe(el);
    });
  },
  beforeUnmount() {
    if (this.observer) this.observer.disconnect();
  },
  methods: {
    scrollTo(id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
};
</script>

<style lang="scss" scoped>
.side-nav {
  position: sticky;
  top: 8rem;

  @include respond(tab-port) {
    display: none;
  }

  .side-nav__title {
    display: block;
    font-family: $font-secondary;
    font-size: $text-extra-small;
    color: #7c4ff5;
    margin-bottom: 1.6rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: start;
    list-style: none;
    padding: 0;
    margin: 0;
    border-left: 1px solid $border-secondary;
  }

  li {
    display: block;
    width: 100%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.8rem;
    padding: 0.7rem 0 0.7rem 1.6rem;
    border-left: 2px solid transparent;
    margin-left: -1px;
    text-decoration: none;
    text-align: left;
    transition: all 0.2s ease;

    &:hover {
      border-left-color: $border-primary;

      .side-nav__label {
        color: #7c4ff5;
      }
    }

    &.active {
      border-left-color: #7c4ff5;

      .side-nav__number {
        color: #7c4ff5;
      }

      .side-nav__label {
        color: #7c4ff5;
      }
    }
  }

  .side-nav__number {
    display: block;
    font-family: $font-secondary;
    font-size: $text-extra-small;
    color: rgba(124, 79, 245, 0.45);
    flex-shrink: 0;
    width: 2.4rem;
    text-align: left;
  }

  .side-nav__label {
    display: block;
    font-family: $font-secondary;
    font-size: $text-extra-small;
    line-height: 1.4;
    color: $color-primary-dark;
    text-align: left;
  }
}
</style>
