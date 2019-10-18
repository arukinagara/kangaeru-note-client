import Vue from 'vue';
import Router from 'vue-router';
import Notes from './components/Notes.vue';
import Ping from './components/Ping.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'notes',
      component: Notes,
    },
    {
      path: '/ping',
      name: 'Ping',
      component: Ping,
    },
  ],
});
