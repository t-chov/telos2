// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
// import Vuex from 'vuex';
import firebase from 'firebase';
import firebaseConfig from '../config/firebase';
import App from './App';
import router from './router';

require('bulma/css/bulma.css');
require('font-awesome/css/font-awesome.css');

// initialize in config/firebase.js
firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);

Vue.config.productionTip = false;
// Vue.use(Vuex);

// const store = new Vuex.Store({
  // state: {
    // tasks: [],
    // user: null,
  // },
  // mutations: {
    // ...firebaseMutations
  // }
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // store,
  template: '<App/>',
  components: { App },
});
