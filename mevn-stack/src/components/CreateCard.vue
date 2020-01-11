<template>
    <v-container fluid>
        <v-alert
            v-if="dialoug && !isLoading"
            class='mt-4'
            outlined
            text
            dense
            prominent
            icon="mdi-school"
            type="success">
            <v-row v-model='msg' align="center">
                <v-col class="grow"><span>{{ msg }}</span></v-col>
                <v-col class="shrink">
                </v-col>
            </v-row>
        </v-alert>

        <v-row v-if='!isLoading'>
            <v-col
                class="mx-auto"
                cols="12"
                xs="12"
                sm="9"
                md="9"
                lg="6">
                <v-card 
                    class='pt-4 pr-4 pl-4'
                    light>
                    <v-textarea
                        label="Frage"
                        v-model="question"
                    ></v-textarea>                    
                </v-card>
            </v-col>
        </v-row>
        <v-row v-if='!isLoading'>
            <v-col
                class="mx-auto"
                cols="12"
                xs="12"
                sm="9"
                md="9"
                lg="6">
                <v-card 
                    class='pt-4 pr-4 pl-4'
                    light>
                    <v-textarea
                        label="Antwort"
                        v-model="answer"
                    ></v-textarea>                    
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
                        @click='saveCard' 
                        depressed 
                        color="primary">Karte hinzufügen</v-btn>
                    <v-btn 
                        @click='goToStacks' 
                        class="ma-2" 
                        depressed 
                        dark
                        color="grey">Stapel Übersicht</v-btn>
                </div>
            </v-col>
        </v-row>
        <v-text-field v-if='isLoading' color="success" loading disabled></v-text-field>
    </v-container>

</template>

<script>
    import firebase, { firestore } from 'firebase'

    export default {
        name: "CreateCard",

        data: () => ({
            isLoading: false,
            dialoug: false,
            msg:     '',

            question:  '',
            answer:    '',
        }),

        methods:{
            // Create a Card and Save on DB
            saveCard() {
                // Start Loading
                this.isLoading = true

                let stackId = this.$router.currentRoute.params.id
                // To Collection Stacks
                firestore().collection("stacks").doc(stackId)
                // Update Cards Array
                .update({
                    cards: firebase.firestore.FieldValue.arrayUnion({
                        question:  this.question,
                        answer:    this.answer,
                        createdAt: new Date()
                    })
                })
                this.msg       = "Karte wurde erstellt"
                this.dialoug   = true
                this.isLoading = false
            },

            goToStacks() {
                this.$router.push("/stacks/" + this.$router.currentRoute.params.id)
            }
        }
    }
</script>

<style scoped>

</style>