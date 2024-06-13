import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import axios from "axios";
import vuetify from "./plugins/vuetify";

axios.defaults.baseURL = process.env.VUE_APP_API_URL;

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount("#app");
