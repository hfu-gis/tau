import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify';
import router from './router'

import firebase from 'firebase'

Vue.config.productionTip = false

let app;

const firebaseConfig = {
    apiKey:            "AIzaSyAbhabCHS506aXLvv04tkw0sPa9VL5VnCY",
    authDomain:        "hfu-tau.firebaseapp.com",
    databaseURL:       "https://hfu-tau.firebaseio.com",
    projectId:         "hfu-tau",
    storageBucket:     "hfu-tau.appspot.com",
    messagingSenderId: "552563339663",
    appId:             "1:552563339663:web:6026f25eeb1c3456549bfa"
}

firebase.initializeApp(firebaseConfig)

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      vuetify,
      router,
      render: h => h(App)
    }).$mount('#app') 
  }
})