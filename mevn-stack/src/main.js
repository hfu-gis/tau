import Vue from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify';
import router from './router'

import firebase from 'firebase'

Vue.config.productionTip = false

let app;

const firebaseConfig = {
    apiKey: "AIzaSyCA9WBrAum0Oy7HcapMiuusv-zQhosXsR4",
    authDomain: "mevn-stack-ac903.firebaseapp.com",
    databaseURL: "https://mevn-stack-ac903.firebaseio.com",
    projectId: "mevn-stack-ac903",
    storageBucket: "mevn-stack-ac903.appspot.com",
    messagingSenderId: "52572792433",
    appId: "1:52572792433:web:b46719a48c2acc038e1dd0",
    measurementId: "G-WNR8P2H98Z"

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