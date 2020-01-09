<template>
    <v-container fluid>
        <v-row>
            <v-col
                    class="mx-auto"
                    cols="12"
                    xs="12"
                    sm="9"
                    md="9"
                    lg="6"
            >
                <v-sheet
                        elevation="10"
                        class="pa-10"
                >
                    <v-text-field
                            :label="frage"
                            :solo="solo"
                            :clearable="clearable"
                            :flat="flat"
                    ></v-text-field>
                </v-sheet>
            </v-col>
        </v-row>
        <v-row>
            <v-col
                    class="mx-auto"
                    cols="12"
                    xs="12"
                    sm="9"
                    md="9"
                    lg="6"
            >
                <v-sheet
                        elevation="10"
                        class="pa-10"
                >
                    <v-text-field
                            :label="antwort"
                            :solo="solo"
                            :clearable="clearable"
                            :flat="flat"
                    ></v-text-field>
                </v-sheet>
            </v-col>
        </v-row>
        <v-row>
            <v-col
                    class="mx-auto"
                    cols="12"
                    sm="6"
            >
                    <div class="mx-auto">
                        <v-btn  depressed color="primary">Karte hinzufügen</v-btn>
                       <v-btn class="ma-2" depressed color="primary">Stapel Übersicht</v-btn>
                    </div>
            </v-col>
        </v-row>
    </v-container>

</template>

<script>
    export default {
        name: "CreateCard",
        data: () => ({
            frage: 'Frage',
            antwort: 'Antwort',
            solo: true,
            clearable: true,
            persistentHint: true,
            flat: true,
        }),
    }
</script>

<style scoped>

</style>