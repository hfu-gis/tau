<template>
    <main>
        <v-row justify="center">
            <v-dialog 
                v-model="dialog" 
                persistent 
                max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Stapel erstellen</span>
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
                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="dialog = false; saveStack()">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-row>


    <!-- MY STACKS  -->
        <section>
            <header class='text-left title mb-4 pt-4'>
                Meine Stapel
                <v-btn color="light-green" fab depressed x-small dark>
                    <v-icon @click.stop="dialog = true">mdi-plus</v-icon>
                </v-btn>
            </header>
            <v-expansion-panels multiple >
                <v-expansion-panel 
                v-for="(stack, index) in stacks"
                :key="index">

                <v-expansion-panel-header>
                    <header color="light-green" class='subtitle-1'>{{ stack.title }}</header>
                </v-expansion-panel-header>
                <v-expansion-panel-content class='text-right'>
                    <p class='text-left'>Beschreibung: {{ stack.description }}</p>
                    <v-divider></v-divider>
                    <div class='mt-2'>
                        <v-btn color='primary' depressed rounded small dark>
                            Lernen
                        </v-btn>
                        <v-btn  
                            color="warning" 
                            class='ml-2' 
                            depressed 
                            rounded 
                            small 
                            dark 
                            link 
                            :to="'/stacks/' + stack.id">Bearbeiten</v-btn>
                        <v-btn color="blue" fab depressed x-small dark @click.stop="dialog = true">
                            <v-icon>mdi-account-multiple</v-icon>
                        </v-btn> 
                    </div>
                </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </section>

    <!-- PUBLISHED -->
        <section>
            <header class='text-left title mb-4 pt-4'>
                Veröffentlichte Stapel
            </header>
           <v-expansion-panels multiple >
                <v-expansion-panel 
                v-for="(stack, index) in stacks"
                :key="index">

                <v-expansion-panel-header>
                    <header color="light-green" class='subtitle-1'>{{ stack.title }}</header>
                </v-expansion-panel-header>
                <v-expansion-panel-content class='text-right'>
                    <p class='text-left'>Beschreibung: {{ stack.description }}</p>
                    <v-divider></v-divider>
                    <v-btn color="primary" depressed rounded small dark>
                        Lernen
                    </v-btn>
                    <v-btn color="blue" fab depressed x-small dark @click.stop="dialog = true">
                        <v-icon>mdi-account-multiple</v-icon>
                    </v-btn>
                </v-expansion-panel-content>
                </v-expansion-panel>
            </v-expansion-panels>
        </section>




        
    </main>
</template>

<script>
    import firebase, { firestore } from 'firebase'
    export default {
        data: () => ({
            isLoading: false,
            dialog:    false,
            stackForm: {
                name:        '',
                description: '',
                subject:     '',
            },
            stacks: [],
            fields:   [
                { title: "Meine Stapel" },
                { title: "Veröffentlichte Stapel" }
            ]
        }),

        created() {
            // Start Loading
            this.isLoading = true
            // Get User ID
            let userId = firebase.auth().currentUser.uid
            // Get Stacks where the creatorId equals current User ID
            let ref = firestore().collection('stacks').where("creatorId", "==", userId)
            // Fetch
            ref.get()
            // Handle Result
            .then(snapshot => {
                let results = snapshot.docs
                // Loop through each Result
                results.forEach(doc => {
                    // Push Each Result into the Stacks Array as a Object
                    this.stacks.push({
                        title:       doc._document.proto.fields.title.stringValue       || "",
                        description: doc._document.proto.fields.description.stringValue || "",
                        subject:     doc._document.proto.fields.subject.stringValue     || "",
                        semester:    doc._document.proto.fields.semester                || 1,
                        cards:       doc._document.proto.fields.stacks                  || 0,
                        id:          doc.id
                    })
                })
                // If finished stop Loading
                this.isLoading = false
            })
		},

        methods:{
            // Create a Stack and Save on DB
            saveStack() {
                let userId = firebase.auth().currentUser.uid
                // To Collection Stacks
                firestore().collection("stacks").doc()
                .set({
                    cards:       [],
                    createdAt:   new Date(),
                    creatorId:     userId,
                    title:       this.stackForm.name,
                    description: this.stackForm.description,
                    subject:     this.stackForm.subject
                })
            }
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
        main { width: 70%; }
    }

    @media (min-width: 1904px) {
        main { width: 80%; }
    }

    button {
        margin-left: 0.5rem;
    }

    .v-sheet--offset {
        top: -24px;
        position: relative;
    }
</style>