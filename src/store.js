import Vue from "vue";
import Vuex from "vuex";
import { vuexfireMutations, firestoreAction } from "vuexfire";
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
    bindTodos: firestoreAction(({ bindFirestoreRef }) => {
      // return the promise returned by `bindFirestoreRef`
      return bindFirestoreRef("clients", db.collection("clients"));
    }),
    getClients({ commit }) {
      db.collection("clients").onSnapshot(snapshot => {
        const documents = snapshot.forEach(doc => {
          const data = doc.data();
          data.id = doc.id;
          return data;
        });
        commit("SET_CLIENTS", documents);
        commit("SET_LOADING", false);
      });
      // db.collection("clients")
      //   .get()
      //   .then(querySnapshot => {
      //     const documents = querySnapshot.docs.map(doc => {
      //       const data = doc.data();
      //       data.id = doc.id;
      //       return data;
      //     });
      //     commit("SET_CLIENTS", documents);
      //     commit("SET_LOADING", false);
      //     // do something with documents
      //   });
    }
  }
});
