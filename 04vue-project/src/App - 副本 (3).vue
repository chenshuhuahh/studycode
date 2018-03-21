<template>
  <div>
    <button v-on:click="show = !show">Toggle</button>
    <div class="ab">
      <transition name="fade" mode="out-in">
        <!--<div :is="currentView"></div>-->
      <!--<transition name="my-trans">-->
        <p v-if="show" key="1">i am show a</p>
        <p v-else key="2">i am show b</p>
      </transition>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import comA from './components/a'
  import comB from './components/b'
  export default {
    components: {
      comA,comB
    },
    data (){
      return {
        currentView: 'com-a',
        show: true,
        myValue: '',
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
      }
    },
    methods: {
      onComaMyEvent(parmfromA){
        console.log('onComaMyEvent' + parmfromA)
      },
      changeCom(){
          if(this.currentView === 'com-a'){
            this.currentView = 'com-b'
          }
          else {
            this.currentView = 'com-a'
          }
      }
    }
  }
</script>

<style>
  .fade-enter-active, .fade-leave-active {
    transition: all .5s;
  }
  .fade-enter, .fade-leave-active {
    opacity: 0;
  }

  .my-trans-enter-active, .my-trans-leave-active {
    transition: all .5s ease-out;
  }
  .my-trans-enter {
    transform: translateY(-500px);
    opacity: 0;
  }
  .my-trans-leave-active {
    transform: translateY(500px);
    opacity: 0;
  }
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
