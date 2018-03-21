import Vue from 'vue'
import App from  './App.vue'
import VRouter from 'vue-router'
import Vuex from 'vuex'
import Apple from './components/apple'
import Banana from  './components/banana'

Vue.use(VRouter)
Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    totalPrice: 0,
  },
  mutations: {
    increment(state, price){
      state.totalPrice += price
    },
    decrement(state, price){
      state.totalPrice -= price
    }
  },
  actions: {
    increase(context, price) {
      context.commit('increment', price)
    }
  }
})

let router = new VRouter({
  mode: 'history',
  routes: [
    {
      path: '/apple',
      component: Apple,
      /*children: [
       {
       path: 'red',
       component: RedApple,
       }
       ]*/
    },
    {
      path: '/banana',
      component: Banana
    }
  ]
})

// 数据渲染 根组件
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
