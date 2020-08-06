import Vue from 'vue'
import VueYouTubeEmbed from 'vue-youtube-embed'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from 'vue-router';
import VueNativeSock from 'vue-native-websocket';
import Menu from "@/components/Menu";
import Viewer from "@/components/Viewer";
import Controller from "@/components/Controller";

Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueYouTubeEmbed);
Vue.use(VueNativeSock, 'ws://localhost:6789', { format: 'json' });

const routes = [
  { path: '/', component: Menu },
  { path: '/viewer', component: Viewer },
  { path: '/controller', component: Controller }
];

const router = new VueRouter({
  routes // short for `routes: routes`
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app');
