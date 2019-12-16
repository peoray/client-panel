import Vue from "vue";
import Router from "vue-router";
import Dashboard from "./views/Dashboard.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "dashboard",
      component: Dashboard
    },
    {
      path: "/client/add",
      name: "add-client",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/AddClient.vue")
    },
    
    {
      path: "/client/:id",
      name: "client-details",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/ClientDetails.vue")
    },
    {
      path: "/client/edit/:id",
      name: "edit-client",
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/EditClient.vue")
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
