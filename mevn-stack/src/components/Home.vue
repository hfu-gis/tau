<template>
    <main>
    <!-- MY STACKS  -->


    <!-- PUBLISHED -->





        <section 
            v-for="(field, index) in fields" 
            :key="index">
                <header class='text-left title mb-4 pt-4'>
                {{ field }}
                <v-btn v-if="section == fields[0]" color="light-green" fab depressed x-small dark>
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </header>
           <v-expansion-panels multiple >
                <v-expansion-panel 
                v-for="(subject, index) in subjects"
                :key="index">

                <v-expansion-panel-header>
                    <header color="light-green" class='subtitle-1'>{{ subject }}</header>
                </v-expansion-panel-header>
                <v-expansion-panel-content class='text-right'>
                    <p class='text-left'>Beschreibung: {{subject}}</p>
                    <v-divider></v-divider>
                    <v-btn color="primary" depressed rounded small dark>
                        Lernen
                    </v-btn>
                    <v-btn 
                        v-if="section == subjects[0]" 
                        color="warning" 
                        class='ml-2' 
                        depressed 
                        rounded 
                        small 
                        dark 
                        link 
                        :to="'/stacks/' + item.id">Bearbeiten</v-btn>
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
                title:    '',
                subjects: [],
                fields:   ["Meine Stapel", "Veröffentlichte Stapel"]
        }),
        created() {
            let ref = firestore().collection('users').doc(firebase.auth().currentUser.uid)
            ref.get()
            .then(snapshot => {
            if (snapshot.exists) {
                this.subjects = snapshot.get("subjects")
                this.title    = snapshot.get("username")
                } else {
                    this.title = "error"
                }  
            })
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