import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      works: [
        {
          id: 'w1',
          title: 'Explorer',
          shortDescription: 'Database website for Star Trek Fleet Command game. You can find all necessary information about build cost of components',
          skills: ['CSS & HTML', 'Javascript', 'Vue', ],
          description: ['tex one', 'text two'],
          image: 'project-1'

        },
        {
          id: 'w2',
          title: 'Project 2',
          skills: ['CSS & HTML', 'Javascript', 'Vue', 'CSS & HTML', 'Vue', 'Javascript',  ],
          shortDescription: 'Database website',
          description: ['description part one', 'description part two'],
          image: 'project-1'
          
        },
        {
          id: 'w3',
          title: 'Project 2',
          shortDescription: 'Database website',

          skills: ['CSS & HTML', 'Javascript', 'Vue', ],
          description: ['description part one', 'description part two'],
          image: 'project-1'
          
        },
        {
          id: 'w4',
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
