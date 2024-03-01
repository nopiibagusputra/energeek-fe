import { createApp } from "vue";
import { createPinia } from "pinia";

import "./assets/plugins/fontawesome-free/css/all.min.css";
import "./assets/plugins/icheck-bootstrap/icheck-bootstrap.min.css";
import "./assets/css/adminlte.min.css";
import "./assets/plugins/sweetalert2-theme-bootstrap-4/bootstrap-4.min.css";
import "./assets/plugins/select2/css/select2.min.css";
import "./assets/plugins/select2-bootstrap4-theme/select2-bootstrap4.min.css";
import "./assets/plugins/tempusdominus-bootstrap-4/css/tempusdominus-bootstrap-4.min.css";
import "./assets/plugins/daterangepicker/daterangepicker.css";
import "./assets/plugins/jquery/jquery.min";
// import "./assets/plugins/moment/moment.min";
import "./assets/plugins/bootstrap/js/bootstrap.bundle.min";
import "./assets/js/adminlte.min";
import "./assets/plugins/sweetalert2/sweetalert2.min";
import "./assets/plugins/jquery-validation/jquery.validate.min";
import "./assets/plugins/jquery-validation/additional-methods.min";
import "./assets/plugins/select2/js/select2.full.min";
// import "./assets/plugins/daterangepicker/daterangepicker";
// import "./assets/plugins/tempusdominus-bootstrap-4/js/tempusdominus-bootstrap-4.min";

import App from "./App.vue";
import router from "./router";
import axios from "axios";

const app = createApp(App);

axios.defaults.baseURL = "http://127.0.0.1:8000/api";
axios.defaults.withCredentials = true;
app.config.globalProperties.$axios = axios;
app.use(createPinia());
app.use(router);

app.mount("#app");
