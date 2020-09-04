<template>
            <v-card>
                <v-card-title>
                    <span class="headline">Video hinzufügen</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-row>
                            <v-col cols="12">
                                <v-text-field v-model="title" label="Titel" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field type="number" v-model="begin" label="Start (Sekunden)" required></v-text-field>
                            </v-col>
                            <v-col cols="12" sm="6" md="4">
                                <v-text-field type="number" v-model="duration" label="Dauer (Sekunden)" hint="Leer für volle Länge" persistent-hint></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-text-field label="Youtube URL" v-model="link" required></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                    <small>*Pflichtangabe</small>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" outlined @click="closeDialog">Abbrechen</v-btn>
                    <v-btn color="green darken-1" outlined @click="createVideo">Hinzufügen</v-btn>
                </v-card-actions>
            </v-card>
</template>

<script>
    export default {
        name: "CreateVideoForm",
        data: function () {
            return {
                title: '',
                begin: 0,
                duration: null,
                link: '',
            }
        },
        methods:{
            closeDialog(){
                this.$emit("closeWindow");
            },
            createVideo(){
                this.$socket.sendObj({action: 'createVideo', title: this.title, begin: this.begin, duration: this.duration, link: this.link });
                this.$emit("closeWindow");
            }
        }
    }
</script>

<style scoped>

</style>
