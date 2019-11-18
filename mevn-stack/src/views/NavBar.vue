<template>
    <nav>
        <v-navigation-drawer
            v-model="drawer"
            app
            right>
            
            <template v-slot:prepend>
                <v-list-item two-line>
                    <v-list-item-avatar>
                    <img src="https://randomuser.me/api/portraits/women/81.jpg">
                    </v-list-item-avatar>

                    <v-list-item-content>
                    <v-list-item-title>Jane Smith</v-list-item-title>
                    <v-list-item-subtitle>Logged In</v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>
            </template>
            
            <v-divider></v-divider>
            <v-list dense>
                <v-list-item v-for="item in items" :key="item.text" link>
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>

                    <v-list-item-content>
                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <template v-slot:append>
                <div class="pa-2">
                    <v-btn block>
                        <v-icon>mdi-logout</v-icon>
                        Logout
                    </v-btn>
                </div>
            </template>
        </v-navigation-drawer>

        <v-app-bar
            app
            color="grey darken-3"
            dark>
            <v-img src ="https://upload.wikimedia.org/wikipedia/de/5/57/Hochschule_Furtwangen_HFU_logo.svg"
                   max-width="150"
                   max-height="100">
            </v-img>
            <v-toolbar-title class="text-uppercase dark">Studycards
            </v-toolbar-title>
            <v-spacer />
            <v-list-item-action
                class='d-none d-sm-flex'>
                <v-icon>mdi-account</v-icon>
            </v-list-item-action>
            <v-app-bar-nav-icon 
                @click.stop="drawer = !drawer"
                class='d-flex d-sm-none'/>
        </v-app-bar>

        <v-content>
            <router-view/>
        </v-content>
    </nav>
</template>

<script>
    export default {
        name: 'NavBar',
        props: {
            source: String,
        },
        data: () => ({
            drawer: false,
            items: [
                { icon: 'mdi-magnify', text: 'Suche' },
                { icon: 'mdi-home', text: 'Startseite' },
                { icon: 'mdi-folder', text: 'Stapel ansehen' },
                { icon: 'mdi-folder-plus', text: 'Stapel erstellen' },
                { icon: 'mdi-settings', text: 'Einstellungen' },
            ],
        }),
    }
</script>

<style scoped>

</style>