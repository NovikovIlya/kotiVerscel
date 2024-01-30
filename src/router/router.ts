import { createWebHistory, createRouter } from 'vue-router';
import Vue from 'vue';
import HomeCats from '../page/HomeCats.vue';
import FavoriteList from '../page/FavoriteList/FavoritesList.vue';
import NotFound from '../page/NotFound.vue'


const routes = [
  {
    path: '/',
    name: 'HomeCats',
    component: HomeCats,
  },
  {
    path: '/favorite',
    name: 'FavoriteList',
    component: FavoriteList,
  },
  {
    path: "/:catchAll(.*)",
    name: 'notfound',
    component: NotFound,
  }
];

const router = createRouter({
  //@ts-ignore
  routes: routes,
  history: createWebHistory(),
  scrollBehavior (to, from, savedPosition) {
    // возврат желаемого положения
    return { top: 0 ,behavior: 'smooth'}
  }
});

export default router;
