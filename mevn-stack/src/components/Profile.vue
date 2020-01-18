<template>
    <main 
        v-if="!isLoading" 
        class='mt-8'>
        <section>
            <v-card tile class='pa-4 ma-4'>
                <article>
                    <header>
                        <h2 class="title">E-Mail: {{ user.email }}</h2>
                    </header>
                    <v-divider class='mt-4 mb-4'></v-divider>
                    <div class='text-center'>
                        <v-chip 
                            class='ma-1'
                            color="green"
                            text-color="white">{{ user.degree.stringValue }}</v-chip>
                        <v-chip
                            class='ma-1'
                            color="green"
                            text-color="white">{{ user.semester.integerValue }}. Semester</v-chip>
                    </div>
                </article>
            </v-card>
            <v-btn
                @click="logout"
                color='error'>
                <v-icon
                    small
                    class="pr-2">mdi-logout</v-icon>
                Logout
            </v-btn>
        </section>
    
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

			const user = firebase.auth().currentUser
			this.user.email = user.email
			this.user.id    = user.uid
			let ref = firestore().collection('users').doc(this.user.id)
            ref.get().then(doc => {
				let fields         = doc._document.proto.fields
				this.user.degree   = fields.degree
				this.user.semester = fields.semester
                this.isLoading     = false
            })
        },
        
		methods: {
            //logout
			logout () {
                firebase.auth().signOut()
				this.$router.push("/auth/login")
			}
		}
    }
</script>

<style scoped>
    section {
        width: 90%;
        margin-left: auto;
        margin-right: auto;
    }
    @media (min-width: 600px) {
        section {
            width: 60%
        }
    }
    @media (min-width: 900px) {
        section {
            width: 30%
        }
    }
</style>