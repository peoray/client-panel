import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import auth from './modules/auth'
import client from './modules/client'


export const store = new Vuex.Store({
  // strict: true,
  modules: {
    auth,
    client
  } 
});
