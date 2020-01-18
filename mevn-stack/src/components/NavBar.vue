<template>
    <nav>
        <v-navigation-drawer
            v-model="drawer"
            app
            right>
            
            <template v-if='isLoggedIn' v-slot:prepend>
                <v-list-item two-line to='/profile'>
                    <v-list-item-avatar>
                    <img src="https://randomuser.me/api/portraits/women/81.jpg">
                    </v-list-item-avatar>

                    <v-list-item-content>
                    <v-list-item-title>{{ currentUser }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>
            <v-btn 
                v-if='!isLoggedIn'
                depressed 
                block
                tile
                color='success'
                link to='/auth/login'>
                <v-icon
                    small
                    class="pr-2">mdi-logout
                </v-icon>
                Login
            </v-btn>

            
            
            <v-divider></v-divider>
            <v-list dense v-if='isLoggedIn'>
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
                    v-if='isLoggedIn'
                    depressed 
                    block
                    tile
                    color='error'
                    @click='logout'>
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
                    v-if='isLoggedIn'
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
    
    </nav>
</template>

<script>
    import firebase from 'firebase'
    export default {
        fab: false,
        name: 'NavBar',
        props: {
            source: String,
        },
        data: () => ({
            isLoggedIn: false,
            currentUser: '',
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
        created() {
            if(firebase.auth().currentUser) {
                this.isLoggedIn = true
                this.currentUser = firebase.auth().currentUser.email
            }
        },
        methods: {
            //logout
            logout () {
                firebase.auth().signOut().then(() => {
                    this.$router.push('/auth/login')
                })
            }
        }
    }
</script>

<style scoped>
    .v-application a, .v-application a:hover {
        color: inherit;
        text-decoration: none;
    }
</style>