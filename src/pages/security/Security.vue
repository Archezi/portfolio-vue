<template>
  <div class="security-container">
    <div class="security-wrapper">
      <h2>security {</h2>

      <p class="security-intro">
        Level 2 IT Field Engineer with 4+ years of experience supporting Microsoft 365 environments,
        hybrid Active Directory / Entra ID infrastructure, and enterprise endpoint management.
        Currently pursuing a BSc (Hons) in LAN Cybersecurity at Atlantic Technological University Mayo.
      </p>

      <section class="skills-section">
        <h3>// skills</h3>
        <div class="skills-grid">
          <div class="skill-category" v-for="category in skillCategories" :key="category.name">
            <h4>{{ category.name }}</h4>
            <div class="chip-list">
              <span class="chip" v-for="skill in category.skills" :key="skill">{{ skill }}</span>
            </div>
          </div>
        </div>
      </section>

      <section class="certs-section">
        <h3>// certifications</h3>
        <div class="certs-list">
          <div class="cert-item" v-for="cert in certifications" :key="cert">
            <span class="cert-bullet">▸</span>
            <span class="cert-text">{{ cert }}</span>
          </div>
        </div>
      </section>

      <section class="papers-section">
        <h3>// research & papers</h3>
        <div class="papers-grid">
          <router-link to="/security/papers/least-privilege" class="paper-card">
            <div class="paper-card__tag">Cybersecurity &middot; Zero Trust &middot; Identity</div>
            <h4>Implementation of a Least Privilege Model in a Simulated SME Environment</h4>
            <p>
              A hands-on lab project designing and evaluating a hybrid least-privilege access
              architecture using Active Directory, Microsoft Entra ID, RBAC, and Just-In-Time
              privilege elevation — demonstrating meaningful Zero Trust-aligned security without
              full architectural transformation.
            </p>
            <span class="paper-card__cta">Read paper ></span>
          </router-link>
        </div>
      </section>

      <div class="closing-tag">
        <h2>}</h2>
      </div>
    </div>

    <div class="security-link">
      <base-button class="link" link mode="call-to-action" to="/contact">
        Interested in working together >
      </base-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      skillCategories: [
        {
          name: 'Infrastructure & Networking',
          skills: ['TCP/IP', 'DNS', 'DHCP', 'VLANs', 'NAT', 'SSL VPN', 'Site-to-Site VPN', 'SonicWall', 'UniFi', 'Aruba', 'Managed Switches', 'LAN/WAN', 'Wireless Networking']
        },
        {
          name: 'Cloud & Identity Security',
          skills: ['Microsoft 365', 'SharePoint Online', 'OneDrive', 'Azure', 'Entra ID', 'IAM', 'RBAC', 'MFA', 'Conditional Access', 'Least Privilege']
        },
        {
          name: 'Systems Administration',
          skills: ['Active Directory', 'Group Policy', 'NTFS Permissions', 'M365 Admin', 'File Server', 'Endpoint Provisioning', 'Device Lifecycle']
        },
        {
          name: 'Security Operations',
          skills: ['Vulnerability Management', 'Patch Governance', 'SIEM Log Review', 'Incident Escalation', 'Endpoint Security']
        },
        {
          name: 'Automation & Scripting',
          skills: ['PowerShell', 'Python', 'Bash', 'Git', 'JavaScript', 'TypeScript']
        },
        {
          name: 'Governance & Compliance',
          skills: ['ISO 27001', 'Risk Registers', 'Access Reviews', 'Audit Evidence', 'Security Baselines']
        }
      ],
      certifications: [
        'Security Compliance: ISO 27001 (Pluralsight)',
        'Azure Security Engineer Associate AZ-500 (Pluralsight)',
        'Windows Server 2019 Hyper-V (Pluralsight)',
        'Windows Server Administration (Pluralsight)',
        'Ethical Hacking — Penetration Testing (Pluralsight)',
        'Attacks and Exploits: Network and Application Attacks (Pluralsight)'
      ]
    };
  },
  mounted() {
    window.scrollTo(0, 0);
  }
};
</script>

<style lang="scss" scoped>
.security-container {
  position: relative;
  width: 100%;
  padding-top: 2rem;
}

.security-wrapper {
  border-left: 1px solid $border-primary;
  padding-left: 2rem;
}

h2 {
  font-size: $heading-primary;
  font-family: $font-primary;
  font-weight: 600;
  margin-bottom: 3rem;
}

h3 {
  font-size: $heading-secondary;
  font-family: $font-secondary;
  color: #7c4ff5;
  margin-bottom: 2rem;
  margin-top: 4rem;
}

.security-intro {
  font-size: $text-primary;
  font-family: $font-secondary;
  color: $color-primary-dark;
  line-height: 1.8;
  margin-bottom: 2rem;
  max-width: 80rem;
}

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

.certs-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

.cert-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;

  .cert-bullet {
    display: block;
    color: #7c4ff5;
    font-size: $text-primary;
    flex-shrink: 0;
    line-height: 1.6;
  }

  .cert-text {
    display: block;
    font-family: $font-secondary;
    font-size: $text-primary;
    color: $color-primary-dark;
    line-height: 1.6;
  }
}

.papers-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.paper-card {
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

    .paper-card__cta {
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

.security-link {
  padding-bottom: 4rem;
  padding-top: 2rem;
}
</style>
