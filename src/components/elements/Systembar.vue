<template>
    <v-system-bar height="40px">
        <span class="mr-3">
            <v-chip> <v-icon>mdi-account</v-icon><strong class="mr-1">{{users}}</strong>{{users > 1 ? 'Clients' : 'Client'}}</v-chip>
        </span>
        <span class="mr-3">
                <v-chip><v-icon >mdi-crown</v-icon><strong class="mr-1">{{controller}}</strong> Controller</v-chip>
        </span>
        <span class="mr-3">
                <v-chip><v-icon >mdi-youtube-tv</v-icon><strong class="mr-1">{{viewer}}</strong> Viewer</v-chip>
        </span>
        <v-spacer></v-spacer>
        <span class="overline mr-3">
            CLIPBOARD
        </span>
        <span class="">
            3EF.DE
        </span>
    </v-system-bar>
</template>

<script>
    export default {
        name: "Systembar",
        data: function () {
            return {
                users: 0,
                viewer: 0,
                controller: 0,
            }
        },
        mounted(){
            this.$options.sockets.onmessage = (res) => {
                const message = JSON.parse(res.data);
                if(message.type === "users"){
                    console.log(message)
                    this.users = message.count;
                    this.viewer = message.viewer;
                    this.controller = message.controller;
                }
            }
        },
    }
</script>

<style scoped>

</style>
