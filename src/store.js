import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations } from "vuexfire";
import { db } from "./config/firebase";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    clients: [],
    loading: true,
    user: null
  },
  mutations: {
    SET_CLIENTS(state, payload) {
      state.clients = payload;
    },
    SET_LOADING(state, payload) {
      state.loading = payload;
    },
    ...vuexfireMutations
  },
  actions: {
    getClients({ commit }) {
      db.collection("clients")
        .get()
        .then(querySnapshot => {
          const documents = querySnapshot.docs.map(doc => {
            const data = doc.data();
            data.id = doc.id;
            return data;
          });
          commit("SET_CLIENTS", documents);
          commit("SET_LOADING", false);
          // do something with documents
        });
    }
  }
});
