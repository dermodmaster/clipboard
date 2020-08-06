<template>
    <div>

    </div>
</template>

<script>
    export default {
        name: "viewer",
        mounted(){
            this.$options.sockets.onopen = () => {
                this.$socket.sendObj({action: 'registerViewer'})
            };
        }
    }
</script>

<style scoped>
    body{
        background-color: black;
    }
</style>
