import { createRouter, createWebHistory } from 'vue-router';
import IntroPage from '@/views/IntroPage.vue'; // 引入 IntroPage.vue
import HomePage from '@/views/HomePage.vue';
import Festival from '@/views/Festival.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'intro',  // 將首頁設定為 IntroPage
     component:IntroPage
    },
    {
      path:'/homepage',
      name:'homepage',
      component:HomePage
    },
    {
      path:'/Festival',
      name:'Festival',
      component:Festival
    },
    {
      path:'/meals',
      name:'meals',
      component: () => import('../views/Meals.vue')  
    },
    {
      path:'/workshop',
      component: () => import ('../views/Workshop.vue')
    },
    {
      path:'/art',
      component: () => import('../views/Art.vue')
    },
    {
      path:'/room',
      component: () => import('../views/Room.vue')
    },
    {
      path:'/cart',
      component: () => import('../views/cart.vue')
    }
  ]
});

export default router;
