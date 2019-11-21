<template>
    <main>
        <v-row justify="center">
            <v-dialog v-model="dialog" scrollable max-width="300px">
            <v-card>
                <v-card-title>Freigabe für</v-card-title>
                <v-divider></v-divider>
                <v-card-text style="height: 200px;">
                <v-radio-group 
                    v-model="dialogm1"
                    column
                    multiple>
                    <v-radio v-for="(person, index) in shared" :key="index" :label="person.name" value=""></v-radio>
                </v-radio-group>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                <v-btn color="blue darken-1" text @click="dialog = false">Entfernen</v-btn>
                <v-btn color="blue darken-1" text @click="dialog = false">Schließen</v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </v-row>

        <section 
            v-for="(section, index) in sections" 
            :key="index">
            <header class='text-left title mb-4 pt-4'>
                {{ section.title }}
                <v-btn v-if="section == sections[0]" color="light-green" fab depressed x-small dark>
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </header>
            <v-expansion-panels>
                <v-expansion-panel
                v-for="(item, index) in section.items"
                :key="index">
                <v-expansion-panel-header>
                    <header class='subtitle-1'>{{ item.title }}</header>
                </v-expansion-panel-header>
                <v-expansion-panel-content class='text-right'>
                    <v-btn color="primary" depressed rounded small dark>
                        Lernen
                    </v-btn>
                    <v-btn 
                        v-if="section == sections[0]" 
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
    export default {
        data: () => {
            return {
                dialogm1: '',
                dialog: false,
                sections: [
                    {
                        title: "Meine Liste",
                        items: [
                            {title: "Grundlagen interaktiver Systeme", id:'123'},
                            {title: "Computergrafik", id:'456'}
                        ]
                    }, 
                    {
                        title: "Freigegeben",
                        items: [
                            {title: "Grundlagen interaktiver Systeme"},
                            {title: "Computergrafik"}
                        ]
                    }
                ],
                shared: [
                    {name: 'Alexandra Schmidt'}, 
                    {name: 'Peter Klang'}
                ]
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
        main { width: 40%; }
    }

    @media (min-width: 1264px) {
        main { width: 30%; }
    }

    @media (min-width: 1904px) {
        main { width: 20%; }
    }

    button {
        margin-left: 0.5rem;
    }

    .v-sheet--offset {
        top: -24px;
        position: relative;
    }
</style>