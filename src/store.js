import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
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
      db.collection("clients").onSnapshot(
        snapshot => {
          const documents = snapshot.docs.map(doc => {
            const data = doc.data();
            data.id = doc.id;
            return data;
          });
          commit("SET_CLIENTS", documents);
          commit("SET_LOADING", false);
        },
        error => {
          // handle errors
          alert(error);
        }
      );
    },
    createClient({ commit }, payload) {    
      db.collection("clients")
        .add({
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          phone: payload.phone,
          balance: payload.balance ? payload.balance : 0
        })
        .then(function(docRef) {
          // console.log(docRef.firestore);
          commit("SET_LOADING", false)
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      router.push("/");
    }
  }
});
