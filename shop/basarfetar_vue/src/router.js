import Vue from 'vue'
import Router from 'vue-router'
import cart from './views/Cart.vue'
import home from './views/HomePage.vue'
import accountmanage from './views/AccountManage.vue'
import signup from './views/signup.vue'
import login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/products/category/:cat',
      name: 'category',
      component: home
    },
    {
      path: '/cart/',
      name: 'cart',
      component: cart
    },
    {
      path: '/account/manage/',
      name: 'account_manage',
      component: accountmanage
    },
    {
      path: '/account/signup/',
      name: 'signup',
      component: signup
    },
    {
      path: '/account/login/',
      name: 'login',
      component: login
    },
  ]
})
