import Vue from 'vue'
import VueRouter from 'vue-router'

const VueRouterPush = VueRouter.prototype.push 
VueRouter.prototype.push = function push (to) {
    return VueRouterPush.call(this, to).catch(err => err)
}
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (to) {
  return VueRouterReplace.call(this, to).catch(err => err)
}

const Home = () => import('views/home/Home.vue');
const Cart = () => import('views/cart/Cart.vue');
const Category = () => import('views/category/Category.vue');
const Profile = () => import('views/profile/Profile.vue');
const Detail = () => import('views/detail/Detail.vue')
const Login = () => import('views/user/Login.vue')
const Register = () => import('views/user/Register.vue')
const Order = () => import('views/order/Order.vue')

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
    component: Cart
  },
  {
    path:'/category',
    component: Category
  },
  {
    path:'/profile',
    component: Profile,
    beforeEnter: (to, from, next) => {
      if(to.path === '/login') next({ name: 'Login' })
      next()
    }
  },
  {
    path:'/detail',
    component: Detail
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/reg',
    component: Register
  },
  {
    path: '/order',
    component: Order
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: '/mall',
  routes
})


export default router
