import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/home/Home.vue'

const Cart = () => import('views/cart/cart.vue');
const Category = () => import('views/category/category.vue');
const Profile = () => import('views/profile/profile.vue');
const Detail = () => import('views/detail/detail.vue')



Vue.use(VueRouter)

  const routes = [

  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path:'/cart',
    component: Cart,
  },
  {
    path:'/category',
    component: Category,
  },
  {
    path:'/profile',
    component: Profile,
  },
  {
    path:'/detail',
    component: Detail,
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
