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
          title: 'Explorer',
          shortDescription: 'Database website for Star Trek Fleet Command game. You can find all necessary information about build cost of components',
          skills: ['CSS & HTML', 'Javascript', 'Vue', ],
          description: [
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat labore ullam corrupti eaque, nemo pariatur omnis repellat dicta voluptates perferendis eius ex expedita nobis sunt, ut soluta repudiandae, iure aut!', 
          
          'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat labore ullam corrupti eaque, nemo pariatur omnis repellat dicta voluptates perferendis eius ex expedita nobis sunt, ut soluta repudiandae, iure aut!'],
          image: 'project-1'

        },
        {
          id: 'project2',
          title: 'Project 2',
          skills: ['CSS & HTML', 'Javascript', 'Vue', 'CSS & HTML', 'Vue', 'Javascript',  ],
          shortDescription: 'Database website',
          description: ['description part one', 'description part two'],
          image: 'project-1'
          
        },
        {
          id: 'project3',
          title: 'Project 2',
          shortDescription: 'Database website',

          skills: ['CSS & HTML', 'Javascript', 'Vue', ],
          description: ['description part one', 'description part two'],
          image: 'project-1'
          
        },
        {
          id: 'project4',
          title: 'Project 2',
          shortDescription: 'Database website',
          skills: ['CSS & HTML', 'Javascript', 'Vue', ],
          description: ['description part one', 'description part two'],
          image: 'project-1'
          
        }
      ]
    };
  },
  mutations,
  actions,
  getters
};
