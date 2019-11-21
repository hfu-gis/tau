<template>
    <div class="stacksview" >
        <v-layout row wrap  justify-center>
            <v-flex xs12 md6 lg10 class="my-2">
                <v-card elevation="4" class="mx-auto" height="auto">
                    <v-img class="align-end" height="" width="300" src="https://entwickler.de/wp-content/uploads/2016/01/webdev-trends-2016-900x450.jpg">
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