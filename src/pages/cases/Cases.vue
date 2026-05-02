<template>
  <div class="case-studies-container">
    <div class="case-studies-wrapper">
      <h2>case studies {</h2>

      <p class="case-studies-intro">
        Real-world infrastructure incidents, recoveries, and technical deep-dives from hands-on
        field engineering work. Each case study documents the problem, the diagnostic process,
        and the resolution in full detail.
      </p>

      <section class="studies-section">
        <h3>// research & papers</h3>
        <div class="case-studies-grid">
          <router-link to="/security/papers/least-privilege" class="case-card">
            <div class="case-card__tag">Cybersecurity &middot; Zero Trust &middot; Identity</div>
            <h4>Implementation of a Least Privilege Model in a Simulated SME Environment</h4>
            <p>
              A hands-on lab project designing and evaluating a hybrid least-privilege access
              architecture using Active Directory, Microsoft Entra ID, RBAC, and Just-In-Time
              privilege elevation — demonstrating meaningful Zero Trust-aligned security without
              full architectural transformation.
            </p>
            <span class="case-card__cta">Read paper ></span>
          </router-link>
        </div>
      </section>

      <section class="studies-section">
        <h3>// field case studies</h3>
        <div class="case-studies-grid">
          <router-link to="/case-studies/pfsense-recovery" class="case-card">
            <div class="case-card__tag">Network Infrastructure &middot; Firewall &middot; FreeBSD</div>
            <h4>pfSense Plus Recovery After Power Outage — Netgate 8200</h4>
            <p>
              A production Netgate 8200 firewall became completely unbootable after a power outage
              caused ZFS filesystem corruption. Full remote recovery — config retrieved, OS reinstalled,
              configuration restored — completed in under 5 hours via serial console.
            </p>
            <span class="case-card__cta">Read case study ></span>
          </router-link>
        </div>
      </section>

      <div class="closing-tag">
        <h2>}</h2>
      </div>
    </div>

    <div class="case-studies-link">
      <base-button class="link" link mode="call-to-action" to="/contact">
        Interested in working together >
      </base-button>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>

<style lang="scss" scoped>
.case-studies-container {
  position: relative;
  width: 100%;
  padding-top: 2rem;
}

.case-studies-wrapper {
  border-left: 1px solid $border-primary;
  padding-left: 2rem;
}

h2 {
  font-size: $heading-primary;
  font-family: $font-primary;
  font-weight: 600;
  margin-bottom: 3rem;
}

.case-studies-intro {
  font-size: $text-primary;
  font-family: $font-secondary;
  color: $color-primary-dark;
  line-height: 1.8;
  margin-bottom: 4rem;
  max-width: 80rem;
}

h3 {
  font-size: $heading-secondary;
  font-family: $font-secondary;
  color: #7c4ff5;
  margin-bottom: 2rem;
}

.studies-section {
  margin-top: 4rem;
}

.case-studies-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.case-card {
  display: block;
  background-color: $background-skill;
  border: 1px solid $border-secondary;
  padding: 2.4rem;
  border-radius: 2px;
  text-decoration: none;
  transition: border-color 0.3s ease, background-color 0.3s ease;

  &:hover {
    border-color: $color-secondary;
    background-color: rgba(92, 37, 230, 0.05);

    .case-card__cta {
      color: $color-secondary;
    }
  }

  &__tag {
    display: block;
    font-family: $font-secondary;
    font-size: $text-extra-small;
    color: #7c4ff5;
    margin-bottom: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  h4 {
    display: block;
    font-family: $font-primary;
    font-size: $heading-tertiary;
    color: $color-primary-light;
    margin-bottom: 1.2rem;
    line-height: 1.4;
    font-weight: 600;
  }

  p {
    display: block;
    font-family: $font-secondary;
    font-size: $text-primary;
    color: $color-primary-dark;
    line-height: 1.8;
    margin-bottom: 1.6rem;
  }

  &__cta {
    display: block;
    font-family: $font-secondary;
    font-size: $text-small;
    color: $color-primary-dark;
    transition: color 0.3s ease;
  }
}

.closing-tag {
  margin-top: 4rem;
}

.case-studies-link {
  padding-bottom: 4rem;
  padding-top: 2rem;
}
</style>
