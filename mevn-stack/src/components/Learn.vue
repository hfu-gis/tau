<template>
    <v-container fluid>

        <v-row>
            <v-col
                    class="mx-auto"
                    cols="12"
                    xs="12"
                    sm="9"
                    md="9"
                    lg="6"
            >
                <v-card color="primary" dark
                        elevation="6"
                        class="pa-0"

                >
                    <v-card-title  class="subheading font-weight-bold">Grundlagen Interaktiver Systeme</v-card-title>
                </v-card>
                <v-card v-for="item in items"
                        :key="item.frage"
                        elevation="12"
                        class="pa-12"
                        light
                >
                    <v-card-title class="subheading font-weight-bold" v-text="item.frage"></v-card-title>
                </v-card>
            </v-col>
        </v-row>+
        <v-row>
            <v-col
                    class="mx-auto"
                    cols="12"
                    xs="12"
                    sm="9"
                    md="9"
                    lg="6"
            >
                <v-card v-for="item in items"
                        :key="item.antwort"
                        elevation="12"
                        class="pa-12"
                         light

                        >
                        <v-card-title
                                v-if="isVisible"
                                v-text="item.antwort"></v-card-title>

                </v-card>
            </v-col>
        </v-row>
        <v-row>
            <v-col
                    class="mx-auto"
                    cols="12"
                    sm="6"
            >
                <div class="mx-auto">
                    <v-btn  depressed color="primary" @click="openAnswer()" >Aufdecken</v-btn>
                    <v-btn class="ma-2" depressed color="primary" @click="nextCard()">Nächste Karte</v-btn>
                </div>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
    export default {
        name: "Learn",
        items: [],
        data: () => ({
            isVisible: false,

        }),
        methods: {

            openAnswer(){
            this.isVisible = true
            },

            nextCard(){

            }

        },
        created() {
            this.items = require('../assets/data/learn')
        }
    }

</script>

<style scoped>

</style>