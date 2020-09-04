import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import VueNativeSock from 'vue-native-websocket';
import Menu from "@/components/Menu";
import Viewer from "@/components/Viewer";
import Controller from "@/components/Controller";
import VueWindowSize from 'vue-window-size';

Vue.config.productionTip = false;
Vue.use(VueWindowSize);
Vue.use(VueRouter);
Vue.use(VueYouTubeEmbed);
Vue.use(VueNativeSock, 'wss://leventkoch.de:6677',
    {
        format: 'json',
        reconnection: true, // (Boolean) whether to reconnect automatically (false)
        reconnectionAttempts: 5, // (Number) number of reconnection attempts before giving up (Infinity),
        reconnectionDelay: 3000, // (Number) how long to initially wait before attempting a new (1000)
    });

const routes = [
    {path: '/', component: Menu},
    {path: '/viewer', component: Viewer},
    {path: '/controller', component: Controller}
];

const router = new VueRouter({
    routes // short for `routes: routes`
})

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app');
