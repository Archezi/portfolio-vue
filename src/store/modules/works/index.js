import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      works: [
        {
          id: 'project0',
          title: 'Portfolio 2.0',
          shortDescription:
            'My second portfolio website made with use of VueJs',
          skills: ['SASS & HTML', 'Javascript', 'VueJs', 'Vuex', 'Photoshop'],
          description: [
            'This project was all about applying and presenting my skill in the design and development of the website using VueJs, .'
          ],
          image: 'portfolioVue/portfolioVue-Mockup-MackBook.jpg',
          websiteLink: 'https://portfolio-vue-386d3.web.app/',
          githubLink: 'https://github.com/Archezi/portfolio-vue'
        },
        {
          id: 'project1',
          title: 'Portfolio 1.0',
          shortDescription:
            'My first portfolio website to gather part of my projects',
          skills: ['SASS & HTML', 'Javascript', 'Photoshop'],
          description: [
            'This project was all about applying and presenting my skill in the design and development of the website using vanilla Javascript and Sass.'
          ],
          image: 'portfolio/portfolio-Mockup-MackBook.jpg',
          websiteLink: 'https://archezi.github.io/PortfolioWebsite/index.html',
          githubLink: 'https://github.com/Archezi/PortfolioWebsite'
        },
        {
          id: 'project2',
          title: 'Budget & ToDo App',
          skills: ['SASS & HTML', 'Javascript'],
          shortDescription: 'Budget & ToDo application in vanilla javascript.',
          description: [
            'This is a project to showcase my understanding of the core concept of the Javascript language and applying them to this project.'
          ],
          image: 'javascript/javascript-MacBook-Pro-mockup-front-page.jpg',
          websiteLink: 'https://archezi.github.io/javascript-lab/',
          githubLink: 'https://github.com/Archezi/javascript-lab'
        },
        {
          id: 'project3',
          title: 'Stitching Fairy',
          shortDescription: 'This is my website for local tailoring company',

          skills: ['SASS & HTML', 'Javascript', 'Photoshop', 'Grid'],
          description: [
            `Stitching fairy is my project for a small tailoring workshop who wanted to expand their range of services and update the previous website. For this project I created a logo,  style guide for the company and a website. Website is developed with the use of Grid layout and SASS for styling. `
          ],
          image:
            'stitchingfiary/stitching-fairy-MacBook-Pro-mockup-front-page.jpg',
          websiteLink: 'https://www.stitchingfairy.com/',
          githubLink: 'https://github.com/Archezi/stitchingfairyalternations'
        },
        {
          id: 'project4',
          title: 'NewProvidance',
          shortDescription:
            'One page mockup converted to the fully interactive website base on the Bootstrap framework',
          skills: ['CSS & HTML', 'Bootstrap', 'Javascript'],
          description: ['description part one', 'description part two'],
          image:
            'newprovidance/newprovidance-MacBook-Pro-mockup-front-page.jpg',
          websiteLink: 'https://archezi.github.io/newprovidence_1.0/',
          githubLink: 'https://github.com/Archezi/newprovidence_1.0'
        }
      ]
    };
  },
  mutations,
  actions,
  getters
};
