<template>
  <div>
    <app-navbar></app-navbar>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import AppNavbar from "./components//layout/AppNavbar";
export default {
  components: {
    AppNavbar
  },
  methods: {
    ...mapActions(["isAuthenticatedState"])
  },
  mounted() {
    this.isAuthenticatedState();
  }
};
</script>
