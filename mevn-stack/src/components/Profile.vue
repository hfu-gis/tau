<template>
<main>
    <v-card
        v-if="!isLoading"
        class="mx-auto"
        max-width="434"
        tile>
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
                            <v-list-item-title class="title">{{ user.email }}</v-list-item-title>
                            <v-list-item-subtitle>{{ user.degree.stringValue }}</v-list-item-subtitle>
							<v-list-item-subtitle>{{ user.semester.integerValue }}.Semester</v-list-item-subtitle>
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
                <v-list-item-icon>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>

                <v-list-item-content>
                    <v-list-item v-text="item.number"></v-list-item>
                </v-list-item-content>

            </v-list-item>
        </v-list>
		<v-btn
			depressed
			block
			tile
			@click="logout"
			color='error'>
			<v-icon
				small
				class="pr-2">mdi-logout</v-icon>
			Logout
		</v-btn>
    </v-card>
    <v-text-field v-if='isLoading' color="success" loading></v-text-field>
</main>
</template>


<script>
    import firebase, { firestore } from 'firebase'
    export default {
        name: "Profile",
        data: () => ({
            isLoading: false,
            items: [],
			user: {
				email:    '',
				id:       '',
				degree:   '',
				semester: ''
			}
        }),
        created() {
            this.isLoading = true
			this.items = require('../assets/data/profile')

			const user = firebase.auth().currentUser
			this.user.email = user.email
			this.user.id    = user.uid
			let ref = firestore().collection('users').doc(this.user.id)
			ref.get().then(result => {
				let fields         = result._document.proto.fields
				this.user.degree   = fields.degree
				this.user.semester = fields.semester
                this.isLoading = false
            })
		},
		methods: {
			logout () {
                firebase.auth().signOut()
				this.$router.push("/auth/login")
			}
		}
    }
</script>

<style scoped>

</style>