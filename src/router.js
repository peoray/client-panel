/* eslint-disable no-console */
import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard.vue";
import { user } from "./config/firebase";
// import store from "./store";

Vue.use(Router);

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Login.vue")
    },
    {
      path: "/register",
      name: "register",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Register.vue")
    },
    {
      path: "/",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/client/add",
      name: "add-client",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/AddClient.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/client/:id",
      name: "client-details",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/ClientDetails.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/client/edit/:id",
      name: "edit-client",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/EditClient.vue"),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/settings",
      name: "settings",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Settings.vue"),
      meta: {
        requiresAuth: true
      }
    }
  ]
});

// Nav Guard
router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const { currentUser } = user;

  if (requiresAuth && !currentUser) {
    next({ path: "/login", query: { redirect: to.fullPath } });
  } else if (!requiresAuth && currentUser) {
    next();
  } else if (!requiresAuth && !currentUser) {
    next();
  } else {
    next();
  }
});

export default router;
