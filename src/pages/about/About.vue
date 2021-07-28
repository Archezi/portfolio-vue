<template>
  <div class="about-container">
    <div class="about-wrapper">
      <h2>about {</h2>
      <div class="about-utilities">
        <ul>
          <li>
            <img src="@/assets/icons/linkedin.svg" alt="linkedin icon" />
          </li>
          <li>
            <img src="@/assets/icons/github.svg" alt="github icon" />
          </li>
          <li class="resume-list-item">
            Download my
            <base-button link class="resume-button"
              >Resume
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30.849"
                height="28.921"
                viewBox="0 0 30.849 28.921"
              >
                <path
                  id="Icon_metro-download"
                  data-name="Icon metro-download"
                  d="M17.995,19.28l7.712-7.712H19.923V3.856H16.067v7.712H10.283Zm7.011-3.155-2.161,2.161,7.835,2.922-12.685,4.73L5.31,21.208l7.835-2.922-2.161-2.161L2.571,19.28v7.712l15.424,5.784,15.424-5.784V19.28Z"
                  transform="translate(-2.571 -3.856)"
                  fill="#101211"
                />
              </svg>
            </base-button>
          </li>
        </ul>
      </div>
      <p class="about-description">
        I am a creative frontend developer. From Poland, based in Dublin.
      </p>
      <h3>Main skills</h3>

      <div class="skill-list-container">
        <div class="skill-list-main">
          <p>
            Frontend development,<br />
            UX/UI design,
          </p>
        </div>
        <div class="skill-list-langueges">
          <p>
            Javascritp, HTML, CSS, <br />
            Vue
          </p>
        </div>
        <div class="skill-list-design">
          <p>
            Photoshop, Illustrator, <br />
            AdobeXD
          </p>
        </div>
      </div>
      <div class="about-closing-tag">
        <h2>}</h2>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.about-container {
  position: absolute;
  bottom: 0;
}
.about-wrapper {
  border-left: 1px solid $border-primary;
  padding-left: 2rem;
}
.about-utilities {
  margin-bottom: 2rem;
}
h2 {
  font-size: $heading-primary;
  font-family: $font-primary;
  font-weight: 600;
  margin-bottom: 4rem;
}
ul {
  margin-left: 0;
  padding: 0;
  display: flex;
  justify-content: flex-start;
  li {
    margin-right: 2rem;
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
  margin-left: 2rem;
  height: 3.5rem;
  width: 15rem;
  border-radius: 1.5rem;
  background-color: $color-secondary;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  transition: all ease-in-out 0.3s;
  color: $color-dark;
  svg {
    height: 3rem;
  }
  path {
    transition: all ease-in-out 0.3s;
  }
  &:hover {
    color: $color-primary-light;
    background-color: $color-secondary;
    path {
      fill: $color-primary-light;
    }
  }
}
.about-description {
  font-size: $text-extra;
  font-family: $font-secondary;
  color: $color-secondary;
  margin-bottom: 4rem;
}
h3 {
  font-size: $heading-secondary;
  font-family: $font-primary;
  margin-bottom: 2rem;
}

.skill-list-container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  //   height: 10rem;
  font-family: $font-secondary;
  font-size: $text-primary;
  margin-bottom: 4rem;
  p {
    line-height: 1.6;
  }
}
</style>
