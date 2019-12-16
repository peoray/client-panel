import Vue from "vue";
import Vuex from "vuex";
import router from "./router";
import { vuexfireMutations, firestoreAction } from "vuexfire";
import { db } from "./config/firebase";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    clients: [],
    client: null,
    loading: true,
    user: null
  },
  mutations: {
    SET_CLIENTS(state, payload) {
      state.clients = payload;
    },
    SET_CLIENT(state, payload) {
      state.client = payload;
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
          commit("SET_LOADING", false);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
        });
      router.push("/");
    },
    getSingleClient({ commit }) {
      db.collection("clients")
        .doc(router.currentRoute.params.id)
        .onSnapshot(
          doc => {
            if (doc.exists) {
              // console.log("Document data:", doc.data());
              const data = doc.data();
              data.id = doc.id;
              commit("SET_CLIENT", data);
              commit("SET_LOADING", false);
            } else {
              // doc.data() will be undefined in this case
              console.log("No such document!");
            }
          },
          error => {
            console.log("Error getting document:", error);
          }
        );
    },
    updateBalance({ commit }, payload) {
      db.collection("clients")
        .doc(router.currentRoute.params.id)
        .update({ balance: payload });
    },
    deleteClient() {
      db.collection("clients")
        .doc(router.currentRoute.params.id)
        .delete();
      router.push("/");
    }
  }
});
