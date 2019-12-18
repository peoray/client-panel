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
      path: "/",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: "/login",
      name: "login",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Login.vue"),
      // meta: {
      //   requiresGuest: true
      // },
      // async beforeEnter(to, from, next) {
      //   try {
      //     const has = await user.currentUser;
      //     if (has) {
      //       next("/");
      //     }
      //   } catch (error) {
      //     next("client/add");
      //   }
      // }
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
      path: "/settings",
      name: "settings",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/Settings.vue"),
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
    }
    // {
    //   path: "/about",
    //   name: "about",
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () =>
    //     import(/* webpackChunkName: "about" */ "./views/About.vue")
    // }
  ]
});

// Nav Guard

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (user.currentUser) {
      next();
    } else {
      next("/login");
    }
  } else {
    next();
  }
});

// router.beforeEach((to, from, next) => {
//   // Check for requiresAuth guard
//   if (to.matched.some(route => route.meta.requiresAuth)) {
//     // Check if NO logged user
//     if (!user.currentUser) {
//       // Go to login
//       next({
//         path: "/login"
//         // query: {
//         //   redirect: to.fullPath
//         // }
//       });
//     } else {
//       // Proceed to route
//       next();
//     }
//   } else if (to.matched.some(route => route.meta.requiresGuest)) {
//     // Check if NO logged user
//     if (user.currentUser) {
//       // Go to login
//       next({
//         path: "/"
//         // query: {
//         //   redirect: to.fullPath
//         // }
//       });
//     } else {
//       // Proceed to route
//       next();
//     }
//   } else {
//     // Proceed to route
//     next();
//   }
//   // next()
// });

export default router;
