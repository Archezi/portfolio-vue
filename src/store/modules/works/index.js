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
          skills: ['CSS & HTML', 'Javascript', 'Vue', ],
          description: ['tex one', 'text two'],
          image: 'project-1'

        },
        {
          id: 'w2',
          title: 'Project 2',
          skills: ['CSS & HTML', 'Javascript', 'Vue', ],
          description: ['description part one', 'description part two'],
          image: 'project-1'
          
        },
        {
          id: 'w3',
          title: 'Project 2',
          skills: ['CSS & HTML', 'Javascript', 'Vue', ],
          description: ['description part one', 'description part two'],
          image: 'project-1'
          
        },
        {
          id: 'w4',
          title: 'Project 2',
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
