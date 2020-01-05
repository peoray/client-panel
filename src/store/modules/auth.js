import { db, user } from '../../config/firebase';
import router from '../../router';

export default {
  state: {
    user: null,
    isAuthenticated: false,
    notification: {
      message: '',
      type: ''
    }
  },

  getters: {
    user: state => state.user,
    notification: state => state.notification,
    isAuthenticated: state => state.isAuthenticated
  },

  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
    SET_ISAUTHENTICATED(state, payload) {
      state.isAuthenticated = payload;
    },
    SET_NOTIFICATION_TYPE(state, payload) {
      state.notification.type = payload;
    },
    SET_NOTIFICATION_MESSAGE(state, payload) {
      state.notification.message = payload;
    }
  },
  actions: {
    registerUser({ commit }, payload) {
      user
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('SET_USER', user);
          router.push('/');
        })
        .catch(error => {
          commit('SET_NOTIFICATION_TYPE', 'error');
          commit('SET_NOTIFICATION_MESSAGE', error.message);
        });
    },
    loginUser({ commit }, payload) {
      user
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('SET_USER', user);
          router.push('/');
        })
        .catch(error => {
          commit('SET_NOTIFICATION_TYPE', 'error');
          commit('SET_NOTIFICATION_MESSAGE', error.message);
        });
    },
    isAuthenticatedState({ commit }) {
      user.onAuthStateChanged(function(user) {
        if (user) {
          commit('SET_USER', user);
          commit('SET_ISAUTHENTICATED', true);
        } else {
          // User is signed out.
          commit('SET_ISAUTHENTICATED', false);
        }
      });
    },
    logoutUser() {
      user.signOut();
      router.push('/login');
    }
  }
};
