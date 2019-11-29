<template>
    <main>
        <v-card class='mt-6'>
            <v-form
                    v-if='!isLoading'
                    ref='form'>
                <v-text-field
                        label='Benutzername'
                        required></v-text-field>
                <v-text-field
                        label='Email'
                        required></v-text-field>
                <v-text-field
                        label='Passwort'
                        type='password'
                        required></v-text-field>
                <v-text-field
                        label='Passwort wiederholen'
                        type='password'
                        required></v-text-field>
                <v-overflow-btn
                        class="my-2"
                        :items="studiengang"
                        label="Studiengang"
                        editable
                        item-value="text"
                ></v-overflow-btn>
                <v-overflow-btn
                    class="my-2"
                    :items="semester"
                    label="Semester"
                    editable
                    item-value="text"
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
    export default {
        name: "SignUp",
        data: () => ({
            isLoading: false,
            semester: [
                '1', '2', '3','4', '5', '6', '7'],
            studiengang: [
                'MIB', 'MIM', 'AIN','MKB', 'ITP', 'OMB']
        }),
        props: {},
        methods: {
            validate () {
                this.isLoading = true
            }
        }
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