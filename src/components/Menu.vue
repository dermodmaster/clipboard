<template>
    <div>
        <systembar></systembar>
        <v-row class="fullscreen text-center" justify="center" align="center">
            <v-col>
                <h1 class="display-3 font-weight-thin">Ich bin...</h1>
                <v-row>
                    <v-col @click="registerViewer">
                        <router-link to="viewer" tag="span">
                            <v-btn>Viewer</v-btn>
                        </router-link>
                    </v-col>
                    <v-col @click="registerController">
                        <router-link to="controller"  tag="span">
                            <v-btn>Controller</v-btn>
                        </router-link>
                    </v-col>

                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import Systembar from "@/components/elements/Systembar";
    export default {
        name: "mainmenu",
        components: {Systembar},
        data: function () {
            return {
                users: 0,
                viewer: 0,
                controller: 0,
            }
        },
        mounted(){
            this.$options.sockets.onopen = () => {
                this.$socket.sendObj({action: 'unregister'})
            };
            this.$socket.sendObj({action: 'unregister'});
        },
        methods:{
            registerViewer(){
                this.$socket.sendObj({action: 'registerViewer'});
            },
            registerController(){
                this.$socket.sendObj({action: 'registerController'});
            }
        }
    }
</script>

<style scoped>
    .fullscreen{
        width: 100vw;
        height: calc(100vh - 40px);
    }
</style>
