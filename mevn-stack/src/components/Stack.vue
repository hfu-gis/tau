<template>
    <main class='mt-3'>
        <v-row justify="center" v-if='!isLoading'>
            <v-dialog 
                v-model="dialog1" 
                persistent 
                max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Stapel bearbeiten</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-text-field 
                                        v-model="stackForm.name" 
                                        label="Stapelname"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field 
                                        v-model="stackForm.description" 
                                        label="Beschreibung"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="stackForm.subject" label="Fach"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>  
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog1 = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="dialog1 = false; saveStack()">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-row>
        <v-container 
		v-if='!isLoading && !err' 
		class='text-left'>
			
			<v-card class='pa-4 mb-4'>
				<p>Titel: {{ stack.title }}</p>
				<p>Beschreibung: {{ stack.description }}</p>
                <p><v-icon>mdi-cards</v-icon> {{ stack.cards.length }}</p>
                <div class ="text-right">
                <v-btn  
                    color="warning" 
                    class='ml-2' 
                    depressed 
                    rounded 
                    small 
                    dark 
                    link 
                    @click.stop="dialog1 = true">Bearbeiten</v-btn>
                </div>
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
                <v-btn small rounded depressed dark color='primary' :to="$route.path + '/learn/0'">Lernen</v-btn>
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
            dialog1: false,
			dialog: false,
			isLoading: false,
			err:       false,
			errMsg:    "",
            stack,
            stackForm: {
                name:        "",
                description: "",
                subject:     "",
            },
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
                        subject:     data.subject.stringValue,
                        cards:       arr,
                    }
                    this.stackForm ={
                        name:           data.title.stringValue,
                        description:    data.description.stringValue,
                        subject:        data.subject.stringValue
                    }
					this.isLoading = false
				}
			})
        },
        saveStack() {
            // To Collection Stacks
            this.isLoading = true
            firestore().collection("stacks").doc(this.$route.params.id)
            .update({
                title:       this.stackForm.name,
                description: this.stackForm.description,
                subject:     this.stackForm.subject
            })
            this.$router.go()
        },  
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