import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueTippy from 'vue-tippy'
import VueScrollTo from 'vue-scrollto'
import App from './App.vue'

import './assets/scss/core.scss';
 
Vue.use(VueAxios, axios)
Vue.use(VueTippy)
Vue.use(VueScrollTo)

export const bus = new Vue();

new Vue({
  el: '#app',
  render: h => h(App)
})