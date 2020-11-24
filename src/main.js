import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
const { user } = require("./config/firebase.js");

Vue.config.productionTip = false;

let app;

user.onAuthStateChanged(() => {
  if (!app) {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount("#app");
  }
});
