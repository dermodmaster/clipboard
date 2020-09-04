<template>
    <div>
        <youtube    v-if="showPlayer"
                    class="yt-player"
                :video-id="videoID"
                 :player-vars="{start: video.begin,  autoplay: 1, controls: 0, rel: 0 }"
                    :player-width="windowWidth"
                    :player-height="windowHeight"
                 @playing="playing"
                    @ready="ready"
                    @ended="stop"></youtube>
    </div>
</template>

<script>
    import {getIdFromURL} from "vue-youtube-embed";

    export default {
        name: "viewer",
        mounted(){
            this.$options.sockets.onopen = () => {
                this.$socket.sendObj({action: 'registerViewer'});
            };

            this.$options.sockets.onmessage = (res) => {
                const message = JSON.parse(res.data);
                if (message.type === "playVideo") {
                    const video = {titel: message.titel, begin: message.begin, duration: message.duration, link: message.link};
                    const videoID = getIdFromURL(video.link);
                    this.video = video;
                    this.videoID = videoID;
                    this.showPlayer = true;
                    console.log("show player");
                }
                else if(message.type === "stopVideo"){
                    this.player.stopVideo();
                    this.$socket.sendObj({status: 'finished'});
                    this.showPlayer = false;
                }
            };
        },
        data: function () {
            return {
                showPlayer: false,
                videoID: null,
                video: null,
                player: null
            }
        },
        methods: {
            ready(event) {
                this.player = event.target
            },
            playing () {
                console.log("playing");
                this.$socket.sendObj({status: 'playing'});
                if(this.video.duration){
                    setTimeout(() => {
                        this.stop()
                    }, this.video.duration * 1000)
                }
                // The player is playing a video.
            },
            stop () {
                console.log("stopped");
                this.$socket.sendObj({status: 'finished'});
                this.showPlayer = false;
            },
        }
    }
</script>

<style scoped>
    .yt-player{
        position: fixed;
        top: 0px;
        left:0px;
    }
</style>
