<template>
    <nav>
        <v-navigation-drawer
            v-model="drawer"
            app
            right>
            
            <template v-slot:prepend>
                <v-list-item two-line to='/profile'>
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
                <v-list-item v-for="item in items" :key="item.text" link :to="item.route">
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content class='text-left'>
                        <v-list-item-title>{{ item.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
            <template v-slot:append>
                <v-btn 
                    depressed 
                    block
                    tile
                    color='error'
                    to='/auth/login'>
                    <v-icon
                        small
                        class="pr-2">mdi-logout
                    </v-icon>
                    Logout
                </v-btn>
            </template>
        </v-navigation-drawer>

        <v-app-bar
            app
            color="primary"
            dark>
                <v-toolbar-title>
                    <router-link to='/home'>
                        StudyCards
                    </router-link>
                </v-toolbar-title>
            <v-spacer/>
            <v-list-item-action
                class='d-none d-sm-flex'
                v-for="(el, i) in navItems" 
                :key='i'>
                <v-btn 
                    color='primary' 
                    depressed 
                    x-small 
                    rounded 
                    link 
                    fab 
                    :to="el.to">
                    <v-icon>{{ el.icon }}</v-icon>
                </v-btn>
            </v-list-item-action>
            <v-app-bar-nav-icon 
                @click.stop="drawer = !drawer"
                class='d-flex d-sm-none'/>
        </v-app-bar>

        <v-content>
            <router-view/>
        </v-content>
                <v-btn
          ref="button"
            fab
            depressed   
            fixed
            bottom
            right
          color="primary"
          @click="$vuetify.goTo(0)"
        >
            <v-icon>mdi-arrow-up</v-icon>
        </v-btn>
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
                { icon: 'mdi-magnify',     text: 'Suche', route:'/search'},
                { icon: 'mdi-home',        text: 'Startseite',route:'/home' },
                { icon: 'mdi-folder',      text: 'Stapel ansehen',route:'/home' },
                { icon: 'mdi-folder-plus', text: 'Stapel erstellen',route:'/' },
                { icon: 'mdi-settings',    text: 'Einstellungen',route:'/' },
            ],
            navItems: [
                { icon: 'mdi-magnify', to: '/search' },
                { icon: 'mdi-account', to: '/profile'},
            ]
        }),
    }
</script>

<style scoped>
    .v-application a, .v-application a:hover {
        color: inherit;
        text-decoration: none;
    }
</style>