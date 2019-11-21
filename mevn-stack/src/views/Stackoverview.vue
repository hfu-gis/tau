<template>
    <div class="stacksoverview" >
    <h1 class="display 2 grey--text"    >{{count}} Stacks gefunden zum Fach {{subject}}</h1>
    
    <h1 class="display 3 text-left">Deine Stacks:</h1>
    <v-layout row wrap>
        <v-flex v-for="i in 4" :key="i" xs12 md6 lg3 class="my-2">
            <v-card elevation="4" class="mx-auto" width="300" height="auto">
                <v-img class="align-end" height="100" width="300" src="https://entwickler.de/wp-content/uploads/2016/01/webdev-trends-2016-900x450.jpg">
                </v-img>
                <v-card-text class="pb-0 black--text">
                    <h1 class="text-left">{{subject}}</h1> 
                    <p>200 Cards</p>
                </v-card-text>
                <v-card-actions>
                    <v-layout row wrap align-center>
                        <v-flex class="text-xs-center">
                            <v-btn elevation="3" class='ma-3 mt-n2 green darken-3 white--text'>Details</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-actions>
            </v-card>   
        </v-flex>
    </v-layout>
    <br>
    <h1 class="display 3 text-left">Nutzererstellte Stacks:</h1>
        <v-layout row wrap>
        <v-flex v-for="i in 4" :key="i" xs12 md6 lg3 class="my-2">
            <v-card elevation="4" class="mx-auto" width="300" height="225">
                <v-img class="align-end" height="100" width="300" src="https://entwickler.de/wp-content/uploads/2016/01/webdev-trends-2016-900x450.jpg">
                </v-img>
                <v-card-text class="pb-0 black--text">
                    <h1 class="text-left">{{subject}}</h1> 
                    <p>200 Cards</p>
                </v-card-text>
                <v-card-actions>
                    <v-layout row wrap align-center>
                        <v-flex class="text-xs-center">
                            <v-btn elevation="3" class='ma-3 mt-n2 green darken-3 white--text'>Details</v-btn>
                        </v-flex>
                    </v-layout>
                </v-card-actions>
            </v-card>   
        </v-flex>
    </v-layout>
    </div>
</template>
<script>
export default {
    name: 'StackOverview',
    data: function() {
        return {
        count: 200,
        subject: 'GIS'
        }

    }
}
</script>