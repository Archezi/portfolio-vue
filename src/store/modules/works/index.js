import mutations from './mutations.js';
import actions from './actions.js';
import getters from './getters.js';

export default {
  namespaced: true,
  state() {
    return {
      works: [
        {
          id: 'project8',
          title: 'Photographer',
          skills: [
            'Vue',
            'Vuex',
            'Firebase',
            'Firestore',
            'Authentication',
            'Javascript',
            'HTML',
            'Sass'
          ],
          shortDescription:
            'Portfolio Website for a photographer, where you can create/delete collections and add/remove images to each collection.',
          description: [
            'The main functionalities of the website are full control over the displayed content.',
            'After login as admin, you will have access to the create/delete collection functionalities, and inside of each collection, you can add/remove single images and change the view of displayed images from Slider view to grid view.',
            'You have an image preview of selected files.'
          ],
          image: 'photographer/photographer-mockup.jpg',
          websiteLink: 'https://photographer-9ee9c.web.app/',
          githubLink: 'https://github.com/Archezi/vue-photographer'
        },
        {
          id: 'project7',
          title: 'Invoice App',
          skills: ['Vue', 'Firebase', 'HTML', 'Sass', 'Javascript'],
          shortDescription:
            'You can create, edit, delete invoices, and all is stored on the firebase database.',
          description: [
            'A project inspired by www.frontendmentor.io. I picked this project to implement my knowledge of how to create a Vuejs application with the firebase integration.',
            'You can create, edit and delete invoices from the database. You can filter by the status of the invoices, and you can change the status of each invoice.'
          ],
          image: 'invoiceApp/invoice-app.jpg',
          websiteLink: 'https://invoice-app-f8170.web.app/',
          githubLink: 'https://github.com/Archezi/invoice-app'
        },
        {
          id: 'project6',
          title: 'Pomodoro',
          skills: ['Vue', 'HTML', 'Sass', 'Javascript'],
          shortDescription: 'Customizable Pomodoro application',
          description: [
            'You can customize your Pomodoro to tailor your way of work. The application will automatically switch to brake when your Pomodoro time run out, and after 4 Pomodoros, your application will switch to a long break. '
          ],
          image: 'pomodoro/pomodoro.jpg',
          websiteLink: 'https://pomodoro-36e2c.web.app/',
          githubLink: 'https://github.com/Archezi/pomodoro-app'
        },
        {
          id: 'project5',
          title: 'Budget',
          skills: [' HTML', 'Sass', 'Javascript'],
          shortDescription: 'Budget application in vanilla javascript.',
          description: [
            'This is a project to showcase my understanding of the core concept of the Javascript language and apply them to this project.'
          ],
          image: 'javascript/javascript-MacBook-Pro-mockup-front-page.jpg',
          websiteLink: 'https://archezi.github.io/BudgetApplication/',
          githubLink: 'https://github.com/Archezi/BudgetApplication'
        },
        {
          id: 'project4',
          title: 'Stitching Fairy',
          shortDescription: 'This is my website for local tailoring company',

          skills: [' HTML', 'Sass', 'Javascript', 'Photoshop', 'Grid'],
          description: [
            `Stitching fairy is my project for a small tailoring workshop who wanted to expand their range of services and update the previous website. For this project I created a logo,  style guide for the company and a website. Website is developed with the use of Grid layout and SASS for styling. `
          ],
          image:
            'stitchingfiary/stitching-fairy-MacBook-Pro-mockup-front-page.jpg',
          websiteLink: 'https://www.stitchingfairy.com/',
          githubLink: 'https://github.com/Archezi/stitchingfairyalternations'
        },
        {
          id: 'project3',
          title: 'NewProvidance',
          shortDescription:
            'One page mockup converted to the fully interactive website base on the Bootstrap framework',
          skills: [' HTML', 'Sass', 'Bootstrap', 'Javascript'],
          description: [
            'NewProvidence is a website design by "GetCraftWork", as my practice I converted this design in to live and interactive website to demonstrate and practice my knowledge of responsive development of modern website. To complete this project I used Bootstrap 3 components and grid system and I implemented few wow.js library for visual effects.',
            'Project is created to demonstrate my HTML and CSS skills but I used some simple DOM manipulation in javascript to add some interactions to the website. '
          ],
          image:
            'newprovidance/newprovidance-MacBook-Pro-mockup-front-page.jpg',
          websiteLink: 'https://archezi.github.io/newprovidence_1.0/',
          githubLink: 'https://github.com/Archezi/newprovidence_1.0'
        },
        {
          id: 'project2',
          title: 'Portfolio 2.0',
          shortDescription:
            'My second portfolio website made with use of VueJs',
          skills: [' HTML', 'Sass', 'Javascript', 'VueJs', 'Vuex', 'Photoshop'],
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
          skills: [' HTML', 'Sass', 'Javascript', 'Photoshop'],
          description: [
            'This project was all about applying and presenting my skill in the design and development of the website using vanilla Javascript and Sass.'
          ],
          image: 'portfolio/portfolio-Mockup-MackBook.jpg',
          websiteLink: 'https://archezi.github.io/PortfolioWebsite/index.html',
          githubLink: 'https://github.com/Archezi/PortfolioWebsite'
        }
      ]
    };
  },
  mutations,
  actions,
  getters
};
