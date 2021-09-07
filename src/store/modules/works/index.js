import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      works: [
        {
          id: 'project1',
          title: 'Portfolio',
          shortDescription: 'My previous portfolio website',
          skills: ['CSS & HTML', 'Javascript', 'Photoshop'],
          description: [
            'This project was all about apllying different ',

            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat labore ullam corrupti eaque, nemo pariatur omnis repellat dicta voluptates perferendis eius ex expedita nobis sunt, ut soluta repudiandae, iure aut!'
          ],
          image: 'portfolio/portfolio-Mockup-MackBook.jpg',
          websiteLink: '',
          githubLink: ''
        },
        {
          id: 'project2',
          title: 'Project 2',
          skills: ['CSS & HTML', 'Javascript', 'Vue'],
          shortDescription: 'Database website',
          description: ['description part one', 'description part two'],
          image: 'javascript/javascript-MacBook-Pro-mockup-front-page.jpg',
          websiteLink: '',
          githubLink: ''
        },
        {
          id: 'project3',
          title: 'Project 3',
          shortDescription: 'Database website',

          skills: ['CSS & HTML', 'Javascript', 'Vue'],
          description: ['description part one', 'description part two'],
          image:
            'stitchingfiary/stitching-fairy-MacBook-Pro-mockup-front-page.jpg',
          websiteLink: '',
          githubLink: ''
        },
        {
          id: 'project4',
          title: 'Project 4',
          shortDescription: 'Database website',
          skills: ['CSS & HTML', 'Javascript', 'Vue'],
          description: ['description part one', 'description part two'],
          image:
            'newprovidance/newprovidance-MacBook-Pro-mockup-front-page.jpg',
          websiteLink: '',
          githubLink: ''
        }
      ]
    };
  },
  mutations,
  actions,
  getters
};
