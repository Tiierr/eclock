<template>
  <div id="app">
    <single-static-clock></single-static-clock>
    <different-shape-static-clock></different-shape-static-clock>
    <single-digit-static-clock></single-digit-static-clock>

    <single-clock></single-clock>
    <single-digit-clock></single-digit-clock>
  </div>
</template>

<script>
// import Clock from './components/Clock.vue'
import singleStaticClock from './components/singleStaticClock'
import singleClock from './components/singleClock'
import differentShapeStaticClock from './components/differentShapeStaticClock'

import singleDigitStaticClock from './components/singleDigitStaticClock'
import singleDigitClock from './components/singleDigitClock'


export default {
  name: 'app',
  components: {
    // Clock,
    singleStaticClock,
    singleClock,
    differentShapeStaticClock,
    singleDigitStaticClock,
    singleDigitClock,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
