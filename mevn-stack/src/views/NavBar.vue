<template>
    <nav>
<!-- Toolbar Menu-->
        <v-toolbar flat>
            <v-row >
                <v-img src ="https://upload.wikimedia.org/wikipedia/de/5/57/Hochschule_Furtwangen_HFU_logo.svg"
                       max-width="150"
                       max-height="100">
                </v-img>
                <v-toolbar-title class="text-uppercase grey--text">
                    <span class="font-weight-light">StudyCards</span>
                </v-toolbar-title>
            </v-row>

     <!--Navigations Button (BurgerMenu)-->
            <v-btn class= "hidden-lg-and-up" color="#01905A" dark @click="drawer = !drawer">Menu</v-btn>
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
                    <v-btn class="hidden-md-and-down" color="#01905A" dark v-on="on">
                        Dropdown
                    </v-btn>
                </template>
                <v-list>
                    <v-list-item
                            v-for="(item, index) in items" :key="index" router :to="item.route">
                        <v-list-item-title v-text="item.text"></v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
    <!--Profilbild-->
            <v-avatar class="hidden-md-and-down">
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
                    {text: 'Suche', route: '/search'},
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