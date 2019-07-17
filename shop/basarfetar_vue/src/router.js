import Vue from 'vue/dist/vue'
import Router from 'vue-router'
import cart from './views/Cart.vue'
import home from './views/Home.vue'
import accountmanage from './views/AccountManage.vue'
import signup from './views/signup.vue'

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
  ]
})
