<template>
  <nav class="navbar navbar-expand-md navbar-dark bg-primary mb-4">
    <div class="container">
      <router-link to="/" class="navbar-brand">ClientPanel</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarMain"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarMain">
        <template v-if="isAuthenticated">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link" tag="a"
                >Dashboard</router-link
              >
            </li>
          </ul>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/" class="nav-link" tag="a">{{
                user.email
              }}</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/" class="nav-link" tag="a"
                >Settings</router-link
              >
            </li>
            <li class="nav-item" @click.prevent="logoutUser">
              <router-link to="#!" class="nav-link" tag="a">Logout</router-link>
            </li>
          </ul>
        </template>
        <template v-else>
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link to="/register" class="nav-link" tag="a"
                >Register</router-link
              >
            </li>
            <li class="nav-item">
              <router-link to="/login" class="nav-link" tag="a"
                >Login</router-link
              >
            </li>
          </ul>
        </template>

        <!-- <SignedInLinks /> -->
        <!-- <SignedOutLinks /> -->
      </div>
    </div>
  </nav>
</template>

<script>
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";
import { mapActions, mapState } from "vuex";
export default {
  components: {
    SignedOutLinks,
    SignedInLinks
  },
  data() {
    return {
      // isAuthenticated: false
    };
  },
  computed: {
    ...mapState(["isAuthenticated", "user"])
  },
  methods: {
    ...mapActions(["logoutUser"])
  }
};
</script>
