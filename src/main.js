import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueTippy from 'vue-tippy'
import App from './App.vue'

import './assets/scss/core.scss';
 
Vue.use(VueAxios, axios)
Vue.use(VueTippy)

new Vue({
  el: '#app',
  render: h => h(App)
})