<template>
    <nav>
    <!-- Toolbar Menu-->
    <v-toolbar color=''>
        <v-app-bar-nav-icon 
            color='#000' 
            @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <v-btn icon color='#000'>
            <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <!-- Dropdown-Menu -->
        <v-menu
                v-model="value"
                :disabled="disabled"
                :absolute="absolute"
                :open-on-hover="openOnHover"
                :close-on-click="closeOnClick"
                :close-on-content-click="closeOnContentClick"
                :offset-x="offsetX"
                :offset-y="offsetY">
            <template v-slot:activator="{ on }">
                <v-btn class="mx-2" fab dark color="" x-small>
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn>    
                <v-btn rounded color="" dark v-on="on" small>Mehr</v-btn>
            </template>
            <v-list dense=true>
                <v-list-item
                    v-for="(item, index) in items" 
                    :key="index" 
                    router 
                    :to="item.route">
                    <v-list-item-title v-text="item.text"></v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
        <!--Profilbild-->
        <v-avatar class="" size="36">
            <img src ="https://karrierebibel.de/wp-content/uploads/2017/02/Profilbild-Tipp-Laecheln.jpg">
        </v-avatar>
        </v-toolbar>
        <!-- Navigation -->
        <v-navigation-drawer app v-model="drawer" class="#01905A"  dark>
          <v-list flat>
              <v-list-item-group v-model="item" color="white">
                  <v-list-item v-for="(item, i) in items" :key="i" router :to="item.route">
                      <v-list-item-content>
                          <v-list-item-title v-text="item.text"></v-list-item-title>
                      </v-list-item-content>
                  </v-list-item>
              </v-list-item-group>
          </v-list>
        </v-navigation-drawer>
    <!--END-->
    </nav>
</template>

<script>
    export default {
        name: "NavBar",
        data(){
            return {
                drawer: false,
                items: [
                    {text: 'Profil', route: '/'},
                    {text: 'Stapel erstellen', route: '/'},
                    {text: 'Meine Stapel', route: '/'},
                    {text: 'Suche', route: '/'},
                    {text: 'Einstellungen', route: '/'},
                ],
                disabled: false,
                absolute: false,
                openOnHover: false,
                value: false,
                closeOnClick: true,
                closeOnContentClick: true,
                offsetX: false,
                offsetY: true,
            }
        }

    }
</script>

<style scoped>

</style>