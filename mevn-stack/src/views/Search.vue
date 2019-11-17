<template>
    <div class = "search">
        <h1>Suche</h1>
        <v-container fluid>
            <v-data-iterator
                    :items="items"
                    :items-per-page.sync="itemsPerPage"
                    :page="page"
                    :search="search"
                    :sort-by="sortBy.toLowerCase()"
                    :sort-desc="sortDesc"
                    hide-default-footer
            >
 <!-- Header-->
                <template v-slot:header>
                    <v-toolbar
                            dark
                            color="#01905A"
                            class="mb-1"
                    >
                        <v-text-field
                                v-model="search"
                                clearable
                                flat
                                solo-inverted
                                hide-details
                                label="Suche"
                        ></v-text-field>
                        <template v-if="$vuetify.breakpoint.mdAndUp">
                            <v-spacer></v-spacer>
                            <v-select
                                    v-model="sortBy"
                                    flat
                                    solo-inverted
                                    hide-details
                                    :items="keys"
                                    label="Sortieren nach"
                            ></v-select>
                            <v-spacer></v-spacer>
                            <v-btn-toggle
                                    v-model="sortDesc"
                                    mandatory
                            >
                                <v-btn
                                        large
                                        depressed
                                        color="grey lighten-1"
                                        :value="false"
                                > up
                                    <!--<v-icon>mdi-arrow-up</v-icon>-->
                                </v-btn>
                                <v-btn
                                        large
                                        depressed
                                        color="grey darken-1"
                                        :value="true"
                                >down
                                    <!--<v-icon>mdi-arrow-down</v-icon>-->
                                </v-btn>
                            </v-btn-toggle>
                        </template>
                    </v-toolbar>
                </template>
<!--Props-->
                <template v-slot:default="props">
                    <v-row>
                        <v-col
                                v-for="item in props.items"
                                :key="item.name"
                                cols="12"
                                sm="6"
                                md="4"
                                lg="3"
                        >
                            <v-card>
                                <v-card-title class="subheading font-weight-bold">{{ item.name }}</v-card-title>

                                <v-divider></v-divider>

                                <v-list dense>
                                    <v-list-item
                                            v-for="(key, index) in filteredKeys"
                                            :key="index"
                                    >
                                        <v-list-item-content :class="{ 'green--text': sortBy === key }">{{ key }}:</v-list-item-content>
                                        <v-list-item-content class="align-end" :class="{ 'green--text': sortBy === key }">{{ item[key.toLowerCase()] }}</v-list-item-content>
                                    </v-list-item>
                                </v-list>
                            </v-card>
                        </v-col>
                    </v-row>
                </template>
<!--footer-->
                <template v-slot:footer>
                    <v-row class="mt-2" align="center" justify="center">
                        <span class="grey--text">Items per page</span>
                        <v-menu offset-y>
                            <template v-slot:activator="{ on }">
                                <v-btn
                                        dark
                                        text
                                        color="#01905A"
                                        class="ml-2"
                                        v-on="on"
                                >
                                    {{ itemsPerPage }}
                                    <!--<v-icon>mdi-chevron-down</v-icon>-->
                                </v-btn>
                            </template>
                            <v-list>
                                <v-list-item
                                        v-for="(number, index) in itemsPerPageArray"
                                        :key="index"
                                        @click="updateItemsPerPage(number)"
                                >
                                    <v-list-item-title>{{ number }}</v-list-item-title>
                                </v-list-item>
                            </v-list>
                        </v-menu>

                        <v-spacer></v-spacer>

                        <span
                                class="mr-4
            grey--text"
                        >
            Seite {{ page }} von {{ numberOfPages }}
          </span>
                        <v-btn
                                fab
                                dark
                                color="grey lighten-1"
                                class="mr-1"
                                @click="formerPage"
                        >pre
                            <!--<v-icon>mdi-chevron-left</v-icon>-->
                        </v-btn>
                        <v-btn
                                fab
                                dark
                                color="grey darken-1"
                                class="ml-1"
                                @click="nextPage"
                        >next
                            <!--<v-icon>mdi-chevron-right</v-icon>-->
                        </v-btn>
                    </v-row>
                </template>
            </v-data-iterator>
        </v-container>
    </div>
</template>

<script>
    export default {
        name: "Search",
        data(){
            return {
                itemsPerPageArray: [4, 8, 12],
                search: '',
                filter: {},
                sortDesc: false,
                page: 1,
                itemsPerPage: 4,
                sortBy: 'name',
                keys: [
                    'Name',
                    'Typ',
                    'Karten',
                    'Semester',
                ],
                items: [
                    {
                        typ: 'Stapel',
                        name: 'BWL',
                        karten: 159,
                        semester: 1.0,
                    },
                    {
                        typ: 'Stapel',
                        name: 'Mathe1',
                        karten: 19,
                        semester: 1.0,
                    },
                    {
                        typ: 'Stapel',
                        name: 'Physik',
                        karten: 119,
                        semester: 1.0,
                    },
                    {
                        typ: 'Stapel',
                        name: 'VideoTech',
                        karten: 100,
                        semester: 1.0,
                    },
                    {
                        typ: 'Stapel',
                        name: 'AudioTech',
                        karten: 199,
                        semester: 1.0,
                    },
                    {
                        typ: 'Stapel',
                        name: 'GIS',
                        karten: 129,
                        semester: 2.0,
                    },
                    {
                        typ: 'Stapel',
                        name: 'Prog',
                        karten: 159,
                        semester: 1.0,
                    },
                    {
                        typ: 'Stapel',
                        name: 'UXD',
                        karten: 259,
                        semester: 2.0,
                    },
                    {
                        typ: 'Stapel',
                        name: 'Mathe2',
                        karten: 159,
                        semester: 2.0,
                    },
                    {
                        typ: 'Stapel',
                        name: 'CompGraf',
                        karten: 152,
                        semester: 2.0,
                    },
                ],
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


    }
</script>

<style scoped>

</style>