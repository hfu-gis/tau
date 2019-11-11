<template>
  <main>
    <header>
      <h1>Login</h1>
    </header>
    <form>
      <label>E-Mail</label>
      <input 
        type='email'
        name='email'
        required>
      <label>Passwort</label>
      <input 
        type='password'
        name='password'
        required>
      <button type='submit'>Login</button>  
    </form>
  </main>
</template>

<script>
export default {
  name: 'Login',
  props: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  input { 
    display: block;
    margin: 0.5rem auto;
  }
</style>
