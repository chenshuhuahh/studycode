import Vue from 'vue'

// 全局注册组件
/*Vue.component('my-topNav', {
  template: '<p>this is my topNav</p>',
})*/

// 局部组件注册
var myHeaderChild = {
  template: '<p>this is my header-child</p>',
}

var myHeader = {
  template: '<p><my-topNav-child></my-topNav-child>{{f}} this is my topNav</p>',
  components: {
    'my-header-child': myHeaderChild
  },
  data: function () {
    return {
      f: 1,
      d: 2
    }
  }
}
// 数据渲染 根组件
new Vue({
  el: '#app',
  // template: '<p>hello world! {{ fruit }}</p>',
  data: {
    fruit: 'happy',
  },
  components: {
    'my-header': myHeader
  }
})
