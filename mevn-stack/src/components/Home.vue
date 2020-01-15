<template>
    <main>
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent max-width="600px">
                <v-card>
                    <v-card-title>
                        <span class="headline">Stapel erstellen</span>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-row>
                                <v-col>
                                    <v-text-field v-model="name" label="Stapelname"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="description" label="Beschreibung"></v-text-field>
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field v-model="subject" label="Fach"></v-text-field>
                                </v-col>
                            </v-row>
                        </v-container>  
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
                        <v-btn color="blue darken-1" text @click="dialog = false; save()">Save</v-btn>
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
                    <header color="light-green" class='subtitle-1'><b>[{{stack.subject.stringValue}}] </b> {{ stack.title.stringValue }}</header>
                </v-expansion-panel-header>
                <v-expansion-panel-content class='text-right'>
                    <p class='text-left'>Beschreibung: {{stack.description.stringValue}}</p>
                    <v-divider></v-divider>
                    <v-btn color="primary" depressed rounded small dark>
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
                        :to="'/stacks/'">Bearbeiten</v-btn>
                    <v-btn color="blue" fab depressed x-small dark @click.stop="dialog = true">
                        <v-icon>mdi-account-multiple</v-icon>
                    </v-btn>
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
                v-for="(stack, index) in publish"
                :key="index">

                 <v-expansion-panel-header>
                    <header color="light-green" class='subtitle-1'><b>[{{stack.subject.stringValue}}] </b> {{ stack.title.stringValue }}</header>
                </v-expansion-panel-header>
                <v-expansion-panel-content class='text-right'>
                    <p class='text-left'>Beschreibung: {{stack.description.stringValue}}</p>
                    <v-divider></v-divider>
                    <v-btn color="primary" depressed rounded small dark>
                        Lernen
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
                i: 0,
                j: 0,
                dialog: false,
                name:'' ,
                description: '',
                subject: '',
                stacks: [],
                publish:[],
                fields:   ["Meine Stapel", "Veröffentlichte Stapel"]
        }),
        created() {


            const userId = firebase.auth().currentUser.uid
            let ref = firestore().collection('users').doc(userId)
            ref.get()
            .then(snapshot => {
            if (snapshot.exists) {
                this.title    = snapshot.get("username")
                } else {
                    this.title = "error"
                }  
            })
            let refstacks = firestore().collection("stacks")
            refstacks.orderBy("createdAt", "desc").get()
            .then(snapshot => {
                let results = snapshot.docs
                results.forEach(doc => {
                    const docref = doc._document.proto.fields
                    if(docref.creatorId.stringValue == userId && this.i <= 5){
                        this.i = this.i + 1
                        this.stacks.push({
                        title:  docref.title,
                        subject: docref.subject,
                        description: docref.description,
                        createdAt: docref.createdAt
                    })
                    }
                    else if(docref.creatorId.stringValue != userId && this.j <= 5){
                        this.j = this.j + 1
                        this.publish.push({
                        title:  docref.title,
                        subject: docref.subject,
                        description: docref.description,
                        createdAt: docref.createdAt
                    })  
                    }
                })
            })
            },

        methods:{
        save(){
             const userId = firebase.auth().currentUser.uid
                firestore().collection("stacks").doc()
                .set({
                    cards:     [],
                    title: this.name,
                    createdAt: new Date(),
                    creatorId:   userId,
                    description: this.description,
                    subject: this.subject
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