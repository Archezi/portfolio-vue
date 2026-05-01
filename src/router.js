import { createRouter, createWebHistory } from 'vue-router';

import Home from './pages/Home.vue';
import Work from './pages/work/Work.vue';
import WorkDetails from './pages/work/WorkDetails.vue';
import About from './pages/about/About.vue';
import Contact from './pages/contact/Contact.vue';
import Security from './pages/security/Security.vue';
import LeastPrivilege from './pages/security/papers/LeastPrivilege.vue';

import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/work', component: Work},
    { path: '/work/:id', component: WorkDetails, props: true},
    { path: '/about', component: About},
    { path: '/contact', component: Contact},
    { path: '/security', component: Security},
    { path: '/security/papers/least-privilege', component: LeastPrivilege},
    { path: '/:notFound(.*)', component: NotFound }
  ]
});

export default router;
