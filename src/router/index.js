import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('views/home/Home.vue') 
const Category = () => import('views/category/Category.vue')
Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/home'
  },
  {
    path:'/home',
    name:'Home',
    component:Home
  },
  {
    path:'/category',
    name:'Category',
    component:Category
  },
  {
    path:'/cart',
    name:'Cart',
    component:() => import('views/cart/Cart.vue')
  },
  {
    path:'/profile',
    name:'Profile',
    component:() => import('views/profile/index.vue')
  },
  {
    path:'/detail/:iid',
    name:'Detail',
    component:() => import('views/detail/Detail.vue')
  }

  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
