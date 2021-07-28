<template>
  <dialog open class="work-dialog">
    <div class="dialog-wrapper">
      <div class="project-presentation-left">
        <h2>image</h2>
      </div>
      <div class="project-info-right">
        <header>
          <h3>Project</h3>
          <h1 class="project-title">PROJECT TITLE</h1>
          <div>
            <ul>
              <li>
                <base-button class="skill-list" mode="outline">HTML & CSS</base-button>
              </li>
              <li>
                <base-button class="skill-list" mode="outline">HTML & CSS</base-button>
              </li>
              <li>
                <base-button class="skill-list" mode="outline">HTML & CSS</base-button>
              </li>
              <li>
                <base-button class="skill-list" mode="outline">HTML & CSS</base-button>
              </li>
            </ul>
          </div>
        </header>
        <section class="project-description">
          <h3>About</h3>
          <div class="project-description-container">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur,
              molestiae, repellendus veniam fugit placeat asperiores accusantium
              nesciunt est deleniti rem quia voluptate! Sequi consectetur
              facilis maxime illo? Assumenda, animi mollitia.
            </p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Architecto aliquid consequatur beatae repudiandae praesentium
              assumenda maxime mollitia, ducimus distinctio porro quae laborum
              adipisci quas dolorum quam amet odit blanditiis inventore! Lorem
              ipsum dolor sit amet consectetur adipisicing elit. Laborum
              architecto incidunt, quibusdam facilis vitae ex libero animi ab
              provident quidem voluptas tempora. Doloremque excepturi et est
              accusantium reprehenderit vitae veniam! Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Ut ipsum sapiente nemo quidem,
              cumque ex, praesentium maxime quasi ducimus tempore necessitatibus
              error voluptatibus cum voluptas fuga consequatur, minima facilis
              beatae?
            </p>
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
  </dialog>
</template>
<script>
export default {
  components: {},
  props: {
    title: {
      type: String,
      requried: false
    }
  }
};
</script>

<style lang="scss" scoped>
.work-dialog {
  @include absCenter;
  display: grid;
  grid-template-columns: 1fr;
  aspect-ratio: 2/1;
  box-sizing: border-box;
  background-color: $background-secondary;
  border: 1px solid $border-primary;
}
.dialog-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.project-info-right {
  padding: 2rem;
  border-left: 1px solid $border-primary;
  font-family: $font-primary;
  color: $color-primary-light;

  h1,
  h3,
  .project-description,
  .project-description h4,
  .project-description p,
  .prject-actions-buttons {
    margin-bottom: 2rem;
  }

  header h3 {
    font-size: $text-extra;
    font-family: $font-secondary;
    text-transform: uppercase;
    font-weight: 400;
  }
  h1 {
    font-size: $heading-primary;
    font-family: $font-primary;
    font-weight: 700;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;

  }
  .skill-list {
    font-size: $text-primary;
    padding: 0.5rem 1rem;
    text-transform: lowercase;
    display: flex;
    align-content: center;
    
    margin-right: 1rem;
  }
}
.project-description h3 {
  font-size: $text-extra;
  font-family: $font-secondary;
  text-transform: uppercase;
  font-weight: 400;
}
.project-description-container {
  overflow-y: scroll;
  --scrollbarBG: #cfd8dc;
  --thumbBG: #90a4ae;
  height: 22rem;

  p {
    margin-bottom: 2rem;
  }
}

.prject-actions-buttons {
  display: flex;

  .action-button
   {
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
