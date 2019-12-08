<template>
    <v-card
            class="mx-auto"
            max-width="434"
            tile
    >
        <v-img
                height="100%"
                src="https://marmotamaps.com/de/fx/wallpaper/download/alpenberge/Marmotamaps_Wallpaper_MonteViso_Desktop_1920x1080.jpg"
        >
            <v-row
                    align="end"
                    class="fill-height"
            >
                <v-col
                        align-self="start"
                        class="pa-0"
                        cols="12"
                >
                    <v-list-item-avatar size="130">
                        <img src="https://randomuser.me/api/portraits/women/81.jpg">
                    </v-list-item-avatar>
                </v-col>
                <v-col class="py-0">
                    <v-list-item
                            color="rgba(0, 0, 0, .4)"
                            dark
                    >
                        <v-list-item-content>
                            <v-list-item-title class="title">Jane Smith</v-list-item-title>
                            <v-list-item-subtitle>Medieninformatik</v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-col>
            </v-row>
        </v-img>
        <v-list subheader >
            <v-subheader>Statistik</v-subheader>

            <v-list-item
                    v-for="item in items"
                    :key="item.title"
            >
                <v-list-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-icon>

                <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                    <v-list-item v-text="item.number"></v-list-item>
                </v-list-item-content>

            </v-list-item>
        </v-list>
            <v-btn
                    class="hidden-xs-only"
                    depressed
                    block
                    tile
                    to='/auth/login'
                    color='error'>
                <v-icon
                        small
                        class="pr-2">mdi-logout</v-icon>
                Logout
            </v-btn>
    </v-card>

</template>


<script>
    export default {
        name: "Profile",
        data: () => ({
            items: [],
        }),
        created() {
            this.items = require('../assets/data/profile')
        }
    }
</script>

<style scoped>

</style>