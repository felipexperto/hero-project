import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import Mainheader from './Mainheader.vue'

import './assets/scss/core.scss';

 
Vue.use(VueAxios, axios)

new Vue({
  el: '#app',
  render: h => h(App)
})

new Vue({
  el: '#main-header',
  render: h => h(Mainheader)
})
