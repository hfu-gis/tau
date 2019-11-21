<template>
  <v-app id="app">
    <NavBar/>
  </v-app>
</template>

<script>
  import NavBar from '@/components/NavBar'

  export default {
    name:'App',
    components: {NavBar},
    data () {
      return {

      }
    }
  }
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto+Condensed&display=swap');

#app {
  font-family: 'Roboto Condensed', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
