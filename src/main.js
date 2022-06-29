import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as VueGoogleMaps from "vue2-google-maps" 
Vue.config.productionTip = false
Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDwaABs11c4fQ8sjYk7ZhcHqOy74aAYrfs",
    libraries: "places"
  }
});

if(!window.localStorage.getItem('mockData')){
  let mockData = require('@/mockData.json');
  window.localStorage.setItem('mockData',JSON.stringify(mockData))
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
