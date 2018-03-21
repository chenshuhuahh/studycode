import Vue from 'vue'
import Layout from './components/layout'
import VueRouter from 'vue-router'
import IndexPage from './pages/index'

Vue.use(VueRouter)
let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage
    }
  ]
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<Layout/>',
  components: { Layout }
})
