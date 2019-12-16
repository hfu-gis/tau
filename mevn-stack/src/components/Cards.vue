<template>
  <main>
    <v-card class='mt-6' height="20em">
        <v-card-title>
            <p class="text-left headline">Frage</p>
        </v-card-title>
        <v-card-text class="title black--text font-weight-light">
            <p>{{question}}</p>
        </v-card-text>
    </v-card>

    <v-card class='mt-6' height="20em">
        <v-card-title>
            <p class="text-left headline">Antwort</p>
        </v-card-title>
        <v-card-text class="title black--text font-weight-light">
            <p>{{answer}}</p>
        </v-card-text>
    </v-card>
  </main>
</template>

<script>
    import cards from '../assets/data/cards'
    export default {
        data: () => {
            return cards
        }
    }
</script>

<style scoped>
    main {
        width: 90%;
        margin: 0 auto;
    }
    
    @media (min-width: 600px) {
        main { width: 60%; }
    }

    @media (min-width: 960px) {
        main { width: 60%; }
    }

    @media (min-width: 1264px) {
        main { width: 60%;}
        
    }

    @media (min-width: 1904px) {
        main { width: 60%; }
    }

    button {
        margin-left: 0.5rem;
    }

    .v-sheet--offset {
        top: -24px;
        position: relative;
    }
</style>