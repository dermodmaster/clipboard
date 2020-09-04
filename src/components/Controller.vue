<template>
    <div>
        <div class="systemBox">
            <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="600px">
                    <CreateVideoForm v-on:closeWindow="closeDialog"></CreateVideoForm>
                </v-dialog>
            </v-row>
            <systembar></systembar>
            <v-app-bar
                    color="darkgrey"
                    height="80px"
                    dark
            >
                <div class="d-flex align-center">

                </div>
                <v-btn fab dark color="green" class="mr-3" @click="dialog = true">
                    <v-icon dark>mdi-plus</v-icon>
                </v-btn>
                <v-btn fab dark color="red" class="mr-3" v-if="playing != 0" @click="stopVideo">
                    <v-icon dark>mdi-stop</v-icon>
                </v-btn>
                <v-spacer></v-spacer>

                <v-text-field v-model="videoSearchString"   label="Suchen 🔎"></v-text-field>
                <v-spacer></v-spacer>
                <router-link to="/" tag="span">
                    <v-btn>Menü</v-btn>
                </router-link>
            </v-app-bar>
        </div>

        <v-content class="videoBox">
            <v-row v-if="videos">
                <v-col v-for="video in videoList" v-bind:key="video.ts" :cols="$vuetify.breakpoint.mobile ? 12 : 3">
                    <v-card class="v-chip--clickable videoCard" @click="playVideo(video)">
                        <v-card-title>{{video.title}}</v-card-title>
                        <v-card-text v-if="video.duration">
                            Dauer: {{video.duration}} Sekunden
                        </v-card-text>
                        <v-card-actions>
                            <v-btn color="red" outlined @click="deleteVideo(video)"><v-icon>mdi-delete</v-icon></v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-content>


        <v-footer class="footer" color="red" v-if="playing != 0">
            <v-col
                    class="text-center"
                    cols="12"
            >
                <v-icon>mdi-play</v-icon>
                <span class="subtitle-2">
                    <strong>Es läuft: <i>{{video.title}} ({{playing}} Viewer)</i></strong>
                </span>
            </v-col>
        </v-footer>

    </div>
</template>

<script>
    import Systembar from "@/components/elements/Systembar";
    import CreateVideoForm from "@/components/elements/CreateVideoForm";

    export default {
        name: "controller",
        components: {CreateVideoForm, Systembar},
        mounted() {
            this.$options.sockets.onopen = () => {
                this.$socket.sendObj({action: 'registerController'});
                this.$socket.sendObj({action: 'getVideos'});

            };
            this.$options.sockets.onmessage = (res) => {
                const message = JSON.parse(res.data);
                if (message.type === "videos") {
                    this.videos = message.videos;
                }
                if (message.type === "status"){
                    this.playing = message.playing;
                    this.video = message.video;
                }
            };
            this.$socket.sendObj({action: 'getVideos'});
        },
        data: function () {
            return {
                runningTitle: 'Halt!',
                dialog: false,
                videos: null,
                playing: 0,
                video: null,
                videoSearchString: '',
            }
        },
        computed: {
            videoList(){
                return this.videos.filter(video => {
                    return video.title.toLowerCase().includes(this.videoSearchString.toLowerCase());
                })
            }
        },
        methods: {
            closeDialog() {
                this.dialog = false;
            },
            playVideo(video) {
                this.$socket.sendObj({
                    action: 'playVideo',
                    title: video.title,
                    begin: video.begin,
                    duration: video.duration,
                    link: video.link
                });
            },
            stopVideo(){
                this.$socket.sendObj({
                    action: 'stopVideo',
                });
            },
            deleteVideo(video){

                this.$socket.sendObj({
                    action: 'deleteVideo',
                    ts: video.ts,
                });
            }
        }
    }
</script>

<style scoped>
    .systemBox{
        position: fixed;
        top: 0px;
        width: 100vw;
        z-index: 5;
    }

    .footer {
        width: 100vw;
        position: fixed;
        bottom: 0px;
    }

    .videoBox{
        margin-top: 120px;
        margin-bottom: 60px;
    }

</style>
