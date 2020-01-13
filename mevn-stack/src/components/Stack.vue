<template>
    <main class='mt-3'>
        <v-container 
		v-if='!isLoading && !err' 
		class='text-left'>
			
			<v-card class='pa-4 mb-4'>
				<p>Titel: {{ stack.title }}</p>
				<p>Beschreibung: {{ stack.description }}</p>
                <p><v-icon>mdi-cards</v-icon> {{ stack.cards.length }}</p>
			</v-card>
            
            <v-btn 
                color="primary"
                small
                rounded
                dark
                class="mb-4" 
                @click='createStack()'>Neue Karte</v-btn>

            <!-- Cards -->
            <section>
                <v-card class='pa-4'>
                    <p class='subtitle-1'>Karten</p>
                    <v-divider class='mb-4'></v-divider>
                    <!-- Each Card -->
                    <section v-if="stack.cards.length > 0">
                        <article v-for='(card, index) in stack.cards' :key='index'>
                            <p>{{ index + 1 }} - {{ card.mapValue.fields.question.stringValue.substring(0, 50) }}...</p>
                        </article>
                    </section>
                    <section v-if='stack.cards.length == 0'>
                        Noch keine Karten verfügbar
                    </section>
                </v-card>
            </section>

            <v-card class='mt-4 pa-4 text-center'>
                <v-btn small rounded depressed dark color='primary'>Lernen</v-btn>
                <v-btn small rounded depressed dark color='error'>Löschen</v-btn>
            </v-card>
        </v-container>
		<v-text-field v-if='isLoading' color="success" loading disabled></v-text-field>
    </main>
</template>

<script>
import stack from '../assets/data/stack'
import { firestore } from 'firebase'

export default {
    data () {
		return {
			dialog: false,
			isLoading: false,
			err:       false,
			errMsg:    "",
			stack,
		}
	},

    created () {
		this.isLoading = true
		this.loadStack()
    },

    methods: {
        createStack() {
            this.$router.push("/stacks/" + this.$router.currentRoute.params.id + "/add/card")
        },
		loadStack() {
			let ref = firestore().collection('stacks').doc(this.$route.params.id)
			ref.get().then(result => {
				if (!result._document) {
					this.err = true
					this.errMsg = "No Stack found."
					this.isLoading = false
				}
				else {
                    let data = result._document.proto.fields
                    let arr = data.cards.arrayValue.values
                    if (!arr) {
                        arr = []
                    }
					this.stack = {
						title:       data.title.stringValue,
                        description: data.description.stringValue,
                        cards:       arr
					}
					this.isLoading = false
				}
			})
		}
    },
  }
</script>

<style scoped>
    .v-card {
        width: 100%;
    }
    main {
        width: 90%;
        margin: 0 auto;
    }

    @media (min-width: 960px) {
        main { width: 80%; }
    }

    @media (min-width: 1264px) {
        main { width: 60%; }
    }

    @media (min-width: 1904px) {
        main { width: 40%; }
    }

    button {
        margin-left: 0.5rem;
    }

    .v-sheet--offset {
        top: -24px;
        position: relative;
    }
</style>