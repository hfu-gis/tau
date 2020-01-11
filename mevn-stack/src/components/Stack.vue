<template>
    <main class='mt-3'>
        <v-container 
		v-if='!isLoading && !err' 
		class='text-left'>
			
			<v-card class='pa-4 mb-4'>
				<p>Titel: {{ stack.title }}</p>
				<p>Beschreibung: {{ stack.description }}</p>
                <v-icon>mdi-cards</v-icon> {{ stack.cards }}
			</v-card>
            <v-card>
                <v-data-table
                    :headers="headers"
                    :items="cards"
                    sort-by="calories"
                    class="elevation-1"
                >
                    <template v-slot:top>
                    <v-toolbar flat color="white">
                        <v-toolbar-title>Karten bearbeiten</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-dialog v-model="dialog" max-width="500px">
                        <template v-slot:activator="{ on }">
                            <v-btn 
                                color="primary"
                                small
                                depressed
                                rounded
                                dark
                                class="mb-2" 
                                @click='createStack()'>Neue Karte</v-btn>
                        </template>
                        <v-card>
                            <v-card-title>
                            <span class="headline">{{ formTitle }}</span>
                            </v-card-title>

                            <v-card-text>
                            <v-container>
                                <v-row>
                                <v-col cols="12">
                                    <v-text-field v-model="editedItem.title" label="Titel"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="editedItem.front" label="Front"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="editedItem.back" label="Back"></v-text-field>
                                </v-col>
                                </v-row>
                            </v-container>
                            </v-card-text>

                            <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="blue darken-1" text @click="close">Schließen</v-btn>
                            <v-btn color="blue darken-1" text @click="save">Speichern</v-btn>
                            </v-card-actions>
                        </v-card>
                        </v-dialog>
                    </v-toolbar>
                    </template>
                    <template v-slot:item.action="{ item }">
                    <v-icon
                        color='warn'
                        class="mr-2"
                        @click="editItem(item)"
                    >mdi-pencil
                    </v-icon>
                    <v-icon
                        color='error'
                        @click="deleteItem(item)"
                    >mdi-delete</v-icon>
                    </template>
                    <template v-slot:no-data>
                    <v-btn color="primary" @click="initialize">Reset</v-btn>
                    </template>
                </v-data-table>
            </v-card>

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

			desserts:    "[]",
			editedIndex: "-1",
			editedItem: {
				title: "",
				front: "",
				back:  ""
			},
			defaultItem: {
				title: "",
				front: "",
				back:  ""
			}
		}
	},

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
		this.isLoading = true
		this.loadStack()
		this.initialize()
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
                        cards: arr.length
					}
					this.isLoading = false
				}
			})
		},

		initialize () {
			this.cards = stack.cards
		},

		editItem (item) {
			this.editedIndex = this.cards.indexOf(item)
			this.editedItem = Object.assign({}, item)
			this.dialog = true
		},

		deleteItem (item) {
			const index = this.cards.indexOf(item)
			confirm('Are you sure you want to delete this item?') && this.cards.splice(index, 1)
		},

		close () {
			this.dialog = false
			setTimeout(() => {
			this.editedItem = Object.assign({}, this.defaultItem)
			this.editedIndex = -1
			}, 300)
		},

		save () {
			if (this.editedIndex > -1) {
			Object.assign(this.cards[this.editedIndex], this.editedItem)
			} else {
			this.cards.push(this.editedItem)
			}
			this.close()
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