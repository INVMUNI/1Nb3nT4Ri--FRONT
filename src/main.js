// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
Vue.use(Vuetify, { iconfont: 'mdi' || 'fa' || 'md' || 'fa4' })
import 'vuetify/dist/vuetify.min.css'

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

// App
import App from './App'
// Vue Router
import router from './router'
// Vuex: for services, shared components, etc
import store from './store/index'
//import lodash
import _ from 'lodash'

//validators
import VeeValidate from 'vee-validate'
const VueValidationEs = require('vee-validate/dist/locale/es');
const config = {
  locale: 'es',
  validity: true,
  dictionary: {
    es: VueValidationEs
  },
  fieldsBagName: 'campos',
  errorBagName: 'errors', // change if property conflicts
};
Vue.use(VeeValidate, config);

//import toastr
import VueToastr2 from 'vue-toastr-2'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'
window.toastr = require('toastr')
Vue.use(VueToastr2)

Vue.config.productionTip = false
// set default config
window.events = new Vue();

// MomentJs for Vue
const moment = require('moment')
Vue.use(require('vue-moment'), {
  moment
})

import VueSweetalert2 from 'vue-sweetalert2'
const options = {
  confirmButtonColor: '#41b882',
  cancelButtonColor: '#ff7674',
  confirmButtonText: "Confirmar",
  cancelButtonText: "Cancelar"
}
Vue.use(VueSweetalert2, options)

//volver a validar
store.dispatch('autoLogin')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
})
