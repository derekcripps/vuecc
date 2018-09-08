import '@babel/polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import { Ripple } from 'vuetify/es5/directives'

import Axios from 'axios'
import './registerServiceWorker'
// Added next 3 lines from Seamus
//import Vuetify from 'vuetify'
import Toolbar from './components/Toolbar.vue'
//import ErrorDialog from './components/ErrorDialog.vue'

Vue.config.productionTip = false
Vue.config.debug = process.env.NODE_ENV !== 'production';

// Components
Vue.component('toolbar', Toolbar);
//Vue.component('error-dialog', ErrorDialog)

Axios.defaults.baseURL = 'http://127.0.0.1:8000/main';
Axios.defaults.headers.common.Accept = 'application/json';
//Axios.defaults.xsrfCookieName = 'csrftoken'
//Axios.defaults.xsrfHeaderName = 'X-CSRFToken'
//Axios.defaults.headers.common['Authorization'] = 'Token ' + store.getters.getToken;
Object.defineProperty(Vue.prototype, '$http', {
  get() {
    return Axios;
  }
});
Vue.use(Vuetify);


new Vue({
  router,
  store,
  render: h => h(App),
  template: '<App/>',
  components: { App }
}).$mount('#app')





/* eslint-disable no-new 
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  render: h => h(App),
}) */
