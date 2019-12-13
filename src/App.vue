<template>
  <div>
    <app-navbar></app-navbar>
    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import AppNavbar from "./components//layout/AppNavbar";
export default {
  components: {
    AppNavbar
  }
};
</script>
