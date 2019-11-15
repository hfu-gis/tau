<template>
  <main>
    <header>
      <h1 class='display-1 font-weight-medium'>Login</h1>
    </header>

    <v-card>
      <v-form
        v-if='!isLoading'
        ref='form'>
        <v-text-field 
          label='E-Mail Adresse'
          required></v-text-field>
        <v-text-field 
          label='Passwort'
          type='password'
          required></v-text-field>
        <v-switch
          label='Gerät merken'></v-switch>
        <v-btn 
          color='primary'
          @click='validate'>Login</v-btn>
      </v-form>
    </v-card>

    <v-text-field v-if='isLoading' color="success" loading disabled></v-text-field>
  </main>
</template>

<script>
export default {
  name: 'Login',
  data: () => ({
    isLoading: false
  }),
  props: {},
  methods: {
    validate () {
      this.isLoading = true
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  main {
    width: 90%;
    margin: 0 auto;
  }
  form {
    padding: 1rem;
  }

  header {
    margin: 1rem 0; 
  }
  input { 
    display: block;
    margin: 0.5rem auto;
  }
</style>
