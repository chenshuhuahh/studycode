<template>
  <div>
    {{ hello }}
    <!--{{ number }}-->
    {{ myValue }}
    <button @click="emitMyEvent">emit</button>
    <slot></slot>
  </div>
</template>

<script>
  export default {
//    props: ['number'],
    props: {
        'my-value' :[Number, String]
    },
    data () {
      return {
        hello: 'i am a component'
      }
    },
    methods: {
      emitMyEvent(){
        this.$emit('my-event', this.hello)
      }
    }
  }
</script>

<style>

</style>
