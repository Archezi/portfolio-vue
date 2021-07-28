import { createStore } from 'vuex';

import worksModule from './modules/works/index.js';

const store = createStore({
  modules: {
   works: worksModule,
  },
})

export default store;