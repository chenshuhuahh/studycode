<template>
  <div>
    <!--exp 01---
    <p v-html="hello"></p>
    <p v-text="hello"></p>
    {{ status ? 'success' : 'fail' }}
    {{ num +1 }}
    -->

    <!--exp02---数组渲染用v-for遍历每一项-->
    <ul>
      <li v-for="(item, index) in list">{{ item.name }}---{{item.price }}---{{ index}}</li>
    </ul>
    <a v-if="isPartA">PartA</a>
    <a v-else>no-data</a>
    <a v-show="!isPartA">partB</a>
    <a v-bind:href="link" class="link-href" :class="className" :style="linkCss">to baidu</a>
    <button v-on:click="addItem">addItem</button>
    <button v-on:click="toggle">toggle</button>

    <p><input v-model="myValue" type="text"/>
      {{ myValue }}</p>
    <!--<p><input v-model="myValue" type="text"/>
      {{ myValueWithoutNum }}</p>
    <p><input v-model="myValue" type="text"/>
      {{ getMyValueWithoutNum() }}</p>-->
    <select v-model="selection">
      <option v-for="item in selectOption" :value="item.value">{{item.text}}</option>
      <!--<option value="1">1</option>
      <option value="2">2</option>-->
    </select>
    {{selection}}
    <p>
      <input type="checkbox" v-model="myBox" value="pear"/>
      <input type="checkbox" v-model="myBox" value="banana"/>
      <input type="checkbox" v-model="myBox" value="apple"/>
      {{ myBox }}
    </p>
    <p>
      <input type="radio" v-model="myBox1" value="pear"/>
      <input type="radio" v-model="myBox1" value="banana"/>
      <input type="radio" v-model="myBox1" value="apple"/>
      {{ myBox1 }}
    </p>
    <comA @my-event="onComaMyEvent"></comA>

    <!--exp03---对象渲染也是用v-for遍历每一项
    <ul>
      <li v-for="(value, key) in objList">{{ value }}---{{key}}</li>
    </ul>-->
  </div>
</template>

<script>
  import Vue from 'vue'
  import comA from './components/a'
  export default {
    components: {
      comA
    },
    watch: {
      myValue :function (val, oldVal) {
        console.log(val,oldVal)
      }
    },
    computed: {
      myValueWithoutNum () {
//        return this.myValue.replace(/\d/g, '')
        return Date.now()
      }
    },
    data (){
      return {
        /*exp 01---
         hello: '<span><img>lalala</span>',
         status: true,
         num: 1*/
        selectOption: [
          {
            text: 'apple',
            value: 0
          },
          {
            text: 'banana',
            value: 1
          }
        ],
        selection: null,
        myBox1: [],
        myBox: [],
        myValue: "",
        hello: '<span><img>lalala</span>',
        link: 'http://www.baidu.com',
        className: {
          'red_font': true,
          'green-size': false
        },
        linkCss: {
          'color': 'red',
          'font-size': '20px'
        },
        isPartA: true,
        list: [
          {
            name: 'apple',
            price: 34
          },
          {
            name: 'banana',
            price: 68
          }
        ],
        objList: {
          name: 'apple',
          price: 24,
          color: 'red',
          weight: 14
        }
      }
    },
    methods: {
      getMyValueWithoutNum() {
//        return this.myValue.replace(/\d/g, '')
        return Date.now()
      },
      addItem () {
//          修改列表里面某一项
        Vue.set(this.list, 1, {
          name: 'pie-apple',
          price: 234
        })
        /*单个增加一个
         this.list.push({
         name: 'pie-apple',
         price: 234
         })*/
      },
      toggle (){
        this.isPartA = !this.isPartA
      },
      onComaMyEvent(parmfromA){
        console.log('onComaMyEvent' + parmfromA)
      }
    }
  }
</script>

<style>
  html {
    height: 100%;
  }

  body {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: -100px;
    max-width: 600px;
  }
</style>
