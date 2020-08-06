<template>
    <div>
        <systembar></systembar>
        <v-app-bar

                color="darkgrey"
                height="80px"
                dark
        >
            <div class="d-flex align-center">

            </div>
            <v-btn fab dark color="green" class="mr-3">
                <v-icon dark>mdi-plus</v-icon>
            </v-btn>
            <v-btn fab dark color="red" class="mr-3" v-if="runningTitle" @click="runningTitle=null">
                <v-icon dark>mdi-stop</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <router-link to="/"  tag="span">
                <v-btn>Menü</v-btn>
            </router-link>
        </v-app-bar>

        <v-content>
            <v-row>
                <v-col v-for="video in videos" v-bind:key="video.id">
                    <v-card class="v-chip--clickable">
                        <v-card-title>{{video.title}}</v-card-title>
                    </v-card>
                </v-col>
            </v-row>
        </v-content>



        <v-footer class="footer" color="red" v-if="runningTitle">
            <v-col
                    class="text-center"
                    cols="12"
            >
                <v-icon>mdi-play</v-icon>
                <span class="subtitle-2">
                    <strong>Es läuft: <i>{{runningTitle}}</i></strong>
                </span>
            </v-col>
        </v-footer>

    </div>
</template>

<script>
    import Systembar from "@/components/elements/Systembar";
    export default {
        name: "controller",
        components: {Systembar},
        mounted(){
            this.$options.sockets.onopen = () => {
                this.$socket.sendObj({action: 'registerController'});
            };
        },
        data: function () {
            return {
                runningTitle: 'Halt!',
                videos: [
                    {
                        vid: 1,
                        title: "Halt!",
                        duration: 3,
                        link: "youtu.be/gasdgjx"
                    },
                    {
                        vid: 2,
                        title: "Saarbrücken?",
                        duration: 1,
                        link: "youtu.be/gasdgjx"
                    },
                ]
            }
        }
    }
</script>

<style scoped>
    .footer {
        width: 100vw;
        position: absolute;
        bottom: 0px;
    }
</style>
