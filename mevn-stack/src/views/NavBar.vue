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
        </v-navigation-drawer>

        <v-app-bar
            app
            color="primary"
            dark>
            <v-toolbar-title>App</v-toolbar-title>
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
                { icon: 'mdi-account', text: 'Most Popular' },
                { icon: 'mdi-account', text: 'Subscriptions' },
                { icon: 'mdi-account', text: 'History' },
                { icon: 'mdi-account', text: 'Playlists' },
                { icon: 'mdi-account', text: 'Watch Later' },
            ],
        }),
    }
</script>

<style scoped>

</style>