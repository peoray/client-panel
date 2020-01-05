import { db, user } from '../../config/firebase';
import router from '../../router';

export default {
  state: {
    clients: [],
    client: null,
    loading: true
  },

  getters: {
    clients: state => state.clients,
    client: state => state.client,
    loading: state => state.loading
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
    }
  },
  actions: {
    getClients({ commit }) {
      db.collection('clients').onSnapshot(
        snapshot => {
          const documents = snapshot.docs.map(doc => {
            const data = doc.data();
            data.id = doc.id;
            return data;
          });
          commit('SET_CLIENTS', documents);
          commit('SET_LOADING', false);
        },
        error => {
          // handle errors
          alert(error);
        }
      );
    },
    createClient({ commit }, payload) {
      db.collection('clients')
        .add({
          firstName: payload.firstName,
          lastName: payload.lastName,
          email: payload.email,
          phone: payload.phone,
          balance: payload.balance ? payload.balance : 0
        })
        .then(function(docRef) {
          // console.log(docRef.firestore);
          commit('SET_LOADING', false);
        })
        .catch(function(error) {
          console.error('Error adding document: ', error);
        });
      router.push('/');
    },
    getSingleClient({ commit }) {
      db.collection('clients')
        .doc(router.currentRoute.params.id)
        .onSnapshot(
          doc => {
            if (doc.exists) {
              // console.log("Document data:", doc.data());
              const data = doc.data();
              data.id = doc.id;
              commit('SET_CLIENT', data);
              commit('SET_LOADING', false);
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document!');
            }
          },
          error => {
            console.log('Error getting document:', error);
          }
        );
    },
    updateBalance({ commit }, payload) {
      db.collection('clients')
        .doc(router.currentRoute.params.id)
        .update({ balance: payload });
    },
    updateClient({ commit }, payload) {
      db.collection('clients')
        .doc(router.currentRoute.params.id)
        .update(payload)
        .then(function(data) {
          console.log('Document successfully updated!');
          console.log(data);
          // commit("SET_CLIENT", data);
          commit('SET_LOADING', false);
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error);
        });
      router.go(-1);
    },
    deleteClient() {
      db.collection('clients')
        .doc(router.currentRoute.params.id)
        .delete()
        .then(function(data) {
          console.log('Document successfully updated!');
          console.log(data);
          // commit("SET_CLIENT", data);
          commit('SET_LOADING', false);
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error('Error updating document: ', error);
        });
      router.push('/');
    }
  }
};
