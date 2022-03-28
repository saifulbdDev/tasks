import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router/index";
import store from "./store/index";
import axios from "axios";
import VueAxios from "vue-axios";

import VueMoment from "vue-moment";
import moment from "moment-timezone";

import VueSweetalert2 from 'vue-sweetalert2';

// If you don't need the styles, do not connect
import 'sweetalert2/dist/sweetalert2.min.css';

Vue.use(VueSweetalert2);
Vue.use(VueMoment, {
  moment,
});
Vue.use(VueAxios, axios);
Vue.config.productionTip = false;
const accessToken = localStorage.getItem("auth_token");
if (accessToken) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
}
new Vue({
  vuetify,
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
