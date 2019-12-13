<template>
  <div class="row">
    <div class="col-md-10">
      <Clients />
    </div>
    <div class="col-md-2">
      <Sidebar />
    </div>
  </div>
</template>

<script>
import Clients from "../clients/Clients";
import Sidebar from "./Sidebar";
export default {
  components: {
    Clients,
    Sidebar
  }
};
</script>
