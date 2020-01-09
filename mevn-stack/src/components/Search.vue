<template>
    <v-container>
            <v-data-iterator
            dark
            v-if="!isLoading"
            :items="items"
            :items-per-page.sync="itemsPerPage"
            :page="page"
            :search="search"
            :sort-by="sortBy.toLowerCase()"
            :sort-desc="sortDesc"
            hide-default-footer>

                <template v-slot:header>
                    <v-col
                        cols='12'
                        sm="6">
                        <v-text-field
                            light
                            v-model="search"
                            clearable
                            flat
                            hide-details
                            label="Search"></v-text-field>
                        
                            <v-spacer></v-spacer>
                            <v-select
                                light
                                v-model="sortBy"
                                flat
                                hide-details
                                :items="keys"
                                label="Sort by"></v-select>
                            <v-spacer></v-spacer>
                            <v-btn-toggle
                                class='mt-4'
                                v-model="sortDesc"
                                mandatory
                                rounded>
                                <v-btn
                                    x-small
                                    depressed
                                    fab
                                    color="primary"
                                    :value="false">
                                    <v-icon>mdi-arrow-up</v-icon>
                                </v-btn>
                                <v-btn
                                    x-small
                                    depressed
                                    fab
                                    color="primary"
                                    :value="true">
                                    <v-icon>mdi-arrow-down</v-icon>
                                </v-btn>
                            </v-btn-toggle>
                        
                    </v-col>
                </template>
        
                <template v-slot:default="props">
                    <v-col>
                        <v-row>
                            <v-col
                                v-for="(item, index) in props.items"
                                :key="index"
                                cols="12"
                                xs="12"
                                sm="6"
                                lg="3"
                                >
                                <v-card light>
                                <v-card-title class="subheading font-weight-bold">{{ item.title }}</v-card-title>

                                <v-divider></v-divider>

                                <v-list dense>
                                    <v-list-item
                                    v-for="(key, index) in filteredKeys"
                                    :key="index">
                                    <v-list-item-content :class="{ 'blue--text': sortBy === key }">{{ key }}:</v-list-item-content>
                                    <v-list-item-content class="align-end" :class="{ 'blue--text': sortBy === key }">{{ item[key.toLowerCase()] }}</v-list-item-content>
                                    </v-list-item>
                                </v-list>
                                </v-card>
                            </v-col>
                        </v-row>
                    </v-col>
                </template>

                <template v-slot:footer>
                    <v-col>
                        <v-row class="pa-3 mt-2" align="center" justify="center">
                            <span class="grey--text">Items per page</span>
                            <v-menu offset-y>
                                <template v-slot:activator="{ on }">
                                <v-btn
                                    dark
                                    text
                                    color="secondary"
                                    class="ml-2"
                                    v-on="on">
                                    {{ itemsPerPage }}
                                    <v-icon>mdi-chevron-down</v-icon>
                                </v-btn>
                                </template>
                                <v-list>
                                <v-list-item
                                    v-for="(number, index) in itemsPerPageArray"
                                    :key="index"
                                    @click="updateItemsPerPage(number)">
                                    <v-list-item-title>{{ number }}</v-list-item-title>
                                </v-list-item>
                                </v-list>
                            </v-menu>

                            <v-spacer></v-spacer>

                            <span class="mr-4 grey--text">
                                Page {{ page }} of {{ numberOfPages }}
                            </span>
                            <v-btn
                                fab
                                x-small
                                dark
                                color="primary"
                                class="mr-1"
                                @click="formerPage">
                                <v-icon>mdi-chevron-left</v-icon>
                            </v-btn>
                            <v-btn
                                fab
                                x-small
                                dark
                                color="primary"
                                class="ml-1"
                                @click="nextPage">
                                <v-icon>mdi-chevron-right</v-icon>
                            </v-btn>
                        </v-row>
                    </v-col>
                </template>
            </v-data-iterator>
            
		<v-text-field v-if='isLoading' color="success" loading disabled></v-text-field>

    </v-container>
</template>

<script>
    import { firestore } from 'firebase'
    export default {
        name: "Search",
        data(){
            return {
                isLoading: false,
                itemsPerPageArray: [8, 16, 32],
                search: '',
                filter: {},
                sortDesc: false,
                page: 1,
                itemsPerPage: 8,
                sortBy: 'subject',
                keys: [
                    'subject',
                    'cards',
                    'semester'
                ],
        items: [],
            }
        },
        computed: {
            numberOfPages () {
                return Math.ceil(this.items.length / this.itemsPerPage)
            },
            filteredKeys () {
                return this.keys.filter(key => key !== `Name`)
            },
        },
        methods: {
            nextPage () {
                if (this.page + 1 <= this.numberOfPages) this.page += 1
            },
            formerPage () {
                if (this.page - 1 >= 1) this.page -= 1
            },
            updateItemsPerPage (number) {
                this.itemsPerPage = number
            },
        },
        created() {
            this.isLoading = true
            let ref = firestore().collection('stacks')
            ref.get()
            .then(snapshot => {
                let results = snapshot.docs
                results.forEach(doc => {
                    this.items.push({
                        title:    doc._document.proto.fields.title.stringValue   || "",
                        subject:  doc._document.proto.fields.subject.stringValue || "",
                        semester: doc._document.proto.fields.semester            || 1,
                        cards:    doc._document.proto.fields.stacks              || 0
                    })
                })
                this.isLoading = false
            })
        }
    }
</script>

<style scoped>
</style>