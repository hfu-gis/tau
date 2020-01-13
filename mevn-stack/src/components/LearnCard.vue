<template>
  <main>
    <v-container>

      <v-row v-if='!isLoading '>
        <v-col
          class="mx-auto"
          cols="12"
          xs="12"
          sm="9"
          md="9"
          lg="6">
          <v-card 
            class='pt-4 pr-4 pl-4 pb-1'
            light>
            <p>{{ cards[currentCard].mapValue.fields.question.stringValue }}</p>                  
          </v-card>
        </v-col>
      </v-row>

      <v-row v-if='!isLoading && isVisible'>
        <v-col
          class="mx-auto"
          cols="12"
          xs="12"
          sm="9"
          md="9"
          lg="6">
          <v-card 
            class='pt-4 pr-4 pl-4 pb-1'
            light>
            <p>{{ cards[currentCard].mapValue.fields.answer.stringValue }}</p>               
          </v-card>
        </v-col>
      </v-row>


      <v-row v-if='!isLoading'>
        <v-col
          class="mx-auto"
          cols="12"
          sm="6">
          <div class="mx-auto">
            <v-btn 
              @click='makeVisible' 
              depressed 
              color="warning">
              <v-icon>mdi-eye</v-icon>
            </v-btn>
          </div>
        </v-col>
        <v-col
          class="mx-auto"
          cols="12"
          sm="6">
          <div class="mx-auto">
            <v-btn
              v-if='currentCard > 0'
              @click='previous' 
              depressed 
              dark
              color="grey">Vorherige</v-btn>
            <v-btn
              v-if='currentCard < cards.length - 1'
              @click='next' 
              class="ma-2" 
              depressed 
              dark
              color="primary">Nächste</v-btn>
          </div>
        </v-col>
      </v-row>

      <v-text-field v-if='isLoading' color="success" loading disabled></v-text-field>
    </v-container>
  </main>
</template>

<script>
  import { firestore } from 'firebase'

  export default {
    data:() => ({
      isLoading: false,
      isVisible: false,
      title:       '',
      cards:       [],
      currentCard:  0
    }),

    created() {
      this.isLoading = true
      this.currentCard = this.$router.currentRoute.params.currentCard
      let ref = firestore().collection('stacks').doc(this.$route.params.id)
			ref.get().then(result => {
        let data = result._document.proto.fields
        let arr  = data.cards.arrayValue.values
        if (!arr) {
            arr = []
        }
        
        this.title = data.title.stringValue,
        this.cards = arr
      
        this.isLoading = false	
			})
    },

    methods: {
      makeVisible() {
        this.isVisible = this.isVisible == false ? true : false
      },
      previous() {
        let no = parseInt(this.currentCard) - 1
        if(this.currentCard > 0) {
          this.$router.push('/stacks/' + this.$router.currentRoute.params.id + '/learn/' + no)
        }
      },
      next() {
        let no = parseInt(this.currentCard) + 1
        if(this.currentCard < this.cards.length - 1) {
          this.$router.push('/stacks/' + this.$router.currentRoute.params.id + '/learn/' + no)
        }
      }
    }
  }
</script>

<style>

</style>