<template>
    <main>
        <v-alert
            v-if="err"
            class='mt-4'
            prominent
            type="error">
            <v-row v-model='errMsg' align="center">
                <v-col class="grow"><span>{{ errMsg }}</span></v-col>
                <v-col class="shrink">
                </v-col>
            </v-row>
        </v-alert>
        <v-card class='mt-6'>
            <v-form v-if='!isLoading' ref='form'>
                <!-- <v-text-field
                    label='Benutzername'
                    required></v-text-field> -->
                <v-text-field
                    v-model='form.email'
                    label='Email'
                    required></v-text-field>
                <v-text-field
                    label='Passwort'
                    v-model='form.password.first'
                    type='password'
                    required></v-text-field>
                <v-text-field
                    label='Passwort wiederholen'
                    v-model='form.password.second'
                    type='password'
                    required></v-text-field>
                <v-overflow-btn
                    class="my-2"
                    v-model="form.degree"
                    :items="studiengang"
                    label="Studiengang"
                ></v-overflow-btn>
                <v-overflow-btn
                    class="my-2"
                    v-model="form.semester"
                    :items="semester"
                    label="Semester"
                    ></v-overflow-btn>
                <v-btn
                    rounded
                    color='primary'
                    @click='validate'>Registrieren</v-btn>
            </v-form>
        </v-card>
        
        <v-text-field v-if='isLoading' color="success" loading disabled></v-text-field>
    </main>
</template>

<script>
    import firebase, { firestore } from 'firebase'
    export default {
        name: "SignUp",
        data: () => ({
            isLoading: false,
            semester:    [ 1, 2, 3, 4, 5, 6, 7],
            studiengang: [ 'MIB', 'MIM', 'AIN','MKB', 'ITP', 'OMB' ],
            form: {
                email:    '',
                password: {
                    first:  '',
                    second: ''
                },
                degree: '',
                semester: 0
            },
            errMsg: '',
            err:    false
        }),
        methods: {
            validate () {
                if ( this.form.password.first == this.form.password.second &&
                     this.form.degree.length > 0 &&
                     this.form.semester > 0 ) {

                    this.isLoading = true

                    firebase
                        .auth()
                        .createUserWithEmailAndPassword(
                            this.form.email,
                            this.form.password.first
                        )
                        .then(() => {
                            this.writeUserData()
                            this.$router.push('/')
                        },
                        err => {
                            this.errMsg = err.message
                            this.err = true
                            this.isLoading = false
                        })
                } else {
                    // Passwords doesn't match
                    // Put visual Error handling Code here
                    // Dialog?
                }
                
            },
            writeUserData() {
                const userId = firebase.auth().currentUser.uid
                firestore().collection("users").doc(userId)
                .set({
                    email:     this.form.email,
                    id:        userId,
                    degree:    this.form.degree,
                    semester:  this.form.semester,
                    createdAt: new Date()
                })
            }
        },
    }


</script>

<style scoped>
    main {
        width: 90%;
        margin: 0 auto;
    }

    @media (min-width: 600px) {
        main { width: 60%; }
    }

    @media (min-width: 960px) {
        main { width: 40%; }
    }

    @media (min-width: 1264px) {
        main { width: 30%; }
    }

    @media (min-width: 1904px) {
        main { width: 20%; }
    }

    form {
        padding: 1rem;
    }

    header img {
        margin: 1rem 0;
        width: 8rem;
    }

    input {
        display: block;
        margin: 0.5rem auto;
    }
</style>