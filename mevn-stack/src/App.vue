<template>
  <v-app id="app">
    <NavBar/>
    <router-view/>
  </v-app>
</template>

<script>
  import NavBar from '@/views/NavBar'

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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
