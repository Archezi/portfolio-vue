<template>
  <div class="about-container">
    <div class="about-wrapper">
      <h2>about {</h2>

      <div class="about-utilities">
        <ul>
          <li>
            <a href="https://www.linkedin.com/in/lukaszkaczmarek35/" target="_blank">
              <img src="@/assets/icons/linkedin.svg" alt="LinkedIn" />
            </a>
          </li>
          <li>
            <a href="https://github.com/Archezi" target="_blank">
              <img src="@/assets/icons/github.svg" alt="GitHub" />
            </a>
          </li>
          <li class="resume-list-item">
            Download my
            <a href="https://drive.google.com/file/d/1CJJ0Ai4SvIehGjooi9HeIzcC7nRT1knx/preview" target="_blank">
              <button class="resume-button">
                Resume
                <svg xmlns="http://www.w3.org/2000/svg" width="30.849" height="28.921" viewBox="0 0 30.849 28.921">
                  <path id="Icon_metro-download" data-name="Icon metro-download" d="M17.995,19.28l7.712-7.712H19.923V3.856H16.067v7.712H10.283Zm7.011-3.155-2.161,2.161,7.835,2.922-12.685,4.73L5.31,21.208l7.835-2.922-2.161-2.161L2.571,19.28v7.712l15.424,5.784,15.424-5.784V19.28Z" transform="translate(-2.571 -3.856)" fill="#101211" />
                </svg>
              </button>
            </a>
          </li>
        </ul>
      </div>

      <p class="about-description">
        IT Engineer &amp; Frontend Developer. From Poland, based in Dublin.
      </p>

      <p class="about-bio">
        Level 2 IT Field Engineer with 4+ years of experience supporting Microsoft 365 environments,
        hybrid Active Directory / Entra ID infrastructure, and enterprise endpoint management.
        Alongside engineering work, I build production web applications using Vue.js and modern
        JavaScript frameworks. Currently completing a BSc (Hons) in LAN Cybersecurity at
        Atlantic Technological University Mayo.
      </p>

      <section class="skills-section">
        <h3>// skills</h3>

        <div class="skill-group" v-for="group in skillGroups" :key="group.category">
          <span class="skill-group__category">{{ group.category }}</span>
          <ul class="skill-group__list">
            <li v-for="(skill, index) in group.skills" :key="skill">
              {{ skill }}<span v-if="index < group.skills.length - 1" class="dot"> ·</span>
            </li>
          </ul>
        </div>
      </section>

      <section class="education-section">
        <h3>// education</h3>
        <div class="certs-list">
          <div class="cert-item">
            <span class="cert-bullet">▸</span>
            <div>
              <span class="cert-text">BSc (Hons) in LAN Cybersecurity</span>
              <span class="cert-institution">Atlantic Technological University Mayo</span>
            </div>
          </div>
          <div class="cert-item">
            <span class="cert-bullet">▸</span>
            <div>
              <span class="cert-text">Higher Diploma in Web Design &amp; Development</span>
              <span class="cert-institution">Dublin Institute of Design</span>
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

      <div class="about-closing-tag">
        <h2>}</h2>
      </div>
    </div>

    <div class="about_link">
      <base-button class="link" link mode="call-to-action" to="/contact">
        Write to me if you like what you see >
      </base-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      skillGroups: [
        {
          category: '// frontend development',
          skills: ['JavaScript', 'TypeScript', 'Vue.js', 'Vuex', 'Nuxt', 'Firebase', 'HTML5', 'CSS / SASS', 'Jest']
        },
        {
          category: '// design',
          skills: ['Figma', 'Adobe XD', 'Photoshop', 'Illustrator', 'UX / UI Design', 'Web Design']
        },
        {
          category: '// infrastructure & networking',
          skills: ['TCP/IP', 'DNS', 'DHCP', 'VLANs', 'NAT', 'SSL VPN', 'Site-to-Site VPN', 'SonicWall', 'UniFi', 'Aruba', 'LAN / WAN', 'Wireless Networking']
        },
        {
          category: '// cloud & identity',
          skills: ['Microsoft 365', 'Azure', 'Entra ID', 'SharePoint Online', 'IAM', 'RBAC', 'MFA', 'Conditional Access', 'Least Privilege']
        },
        {
          category: '// systems administration',
          skills: ['Active Directory', 'Group Policy', 'NTFS Permissions', 'M365 Admin', 'File Server', 'Endpoint Provisioning', 'Device Lifecycle']
        },
        {
          category: '// security operations',
          skills: ['Vulnerability Management', 'Patch Governance', 'SIEM Log Review', 'Incident Escalation', 'Endpoint Security']
        },
        {
          category: '// automation & scripting',
          skills: ['PowerShell', 'Python', 'Bash', 'Git', 'JavaScript', 'TypeScript']
        },
        {
          category: '// governance & compliance',
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
.about-container {
  position: relative;
  width: 100%;
  padding-top: 2rem;
}

.about-wrapper {
  border-left: 1px solid $border-primary;
  padding-left: 2rem;
}

.about-utilities {
  margin-bottom: 2rem;
  max-width: 100%;
  display: flex;
}

h2 {
  font-size: $heading-primary;
  font-family: $font-primary;
  font-weight: 600;
  margin-bottom: 4rem;
}

h3 {
  font-size: $heading-secondary;
  font-family: $font-secondary;
  color: #7c4ff5;
  margin-bottom: 2.4rem;
  margin-top: 4rem;
}

ul {
  margin-left: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  li {
    margin-right: 2rem;
    padding-top: 2rem;
  }
}

ul li img {
  height: 3.5rem;
}

.resume-list-item {
  display: flex;
  align-items: center;
  color: $color-primary-dark;
  font-family: $font-primary;
  font-size: $text-primary;
}

.resume-button {
  text-decoration: none;
  font: inherit;
  cursor: pointer;
  margin-left: 2rem;
  height: 3.5rem;
  width: 15rem;
  border: none;
  border-radius: 1.5rem;
  background-color: $color-secondary;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  transition: all ease-in-out 0.3s;
  color: $color-dark;

  svg { height: 3rem; }
  path { transition: all ease-in-out 0.3s; }

  &:hover {
    color: $color-primary-light;
    background-color: $color-secondary;
    path { fill: $color-primary-light; }
  }
}


.about-description {
  font-size: $text-extra;
  font-family: $font-secondary;
  color: $color-secondary;
  margin-bottom: 2rem;
}

.about-bio {
  font-size: $text-primary;
  font-family: $font-secondary;
  color: $color-primary-dark;
  line-height: 1.9;
  max-width: 80rem;
  margin-bottom: 2rem;
}

/* Skills */
.skills-section {
  margin-bottom: 2rem;
}

.skill-group {
  display: flex;
  align-items: baseline;
  gap: 2.4rem;
  padding: 1.2rem 0;
  border-bottom: 1px solid $border-secondary;

  &:last-child {
    border-bottom: none;
  }

  @include respond(phone) {
    flex-direction: column;
    gap: 0.8rem;
  }
}

.skill-group__category {
  font-family: $font-secondary;
  font-size: $text-small;
  color: #7c4ff5;
  min-width: 22rem;
  flex-shrink: 0;

  @include respond(phone) {
    min-width: unset;
  }
}

.skill-group__list {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  padding: 0;
  margin: 0;
  gap: 0;

  li {
    display: inline;
    font-family: $font-secondary;
    font-size: $text-primary;
    color: $color-primary-dark;
    line-height: 1.8;
    padding: 0;
    margin: 0;
    white-space: nowrap;
  }

  .dot {
    color: #7c4ff5;
    margin-right: 0.5rem;
  }
}

/* Certifications */
.certs-section {
  margin-bottom: 2rem;
}

.certs-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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

  .cert-institution {
    display: block;
    font-family: $font-secondary;
    font-size: $text-small;
    color: #7c4ff5;
    line-height: 1.4;
    margin-top: 0.2rem;
  }
}

.about-closing-tag {
  margin-top: 4rem;
}

.about_link {
  padding-bottom: 4rem;
  padding-top: 2rem;
}
</style>
