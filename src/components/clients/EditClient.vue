<template>
  <div>
    <template v-if="!loading && client">
      <div class="row">
        <div class="col-md-6">
          <router-link to="/" class="btn btn-link"
            ><i class="fas fa-arrow-circle-left"></i> Back to
            Dashboard</router-link
          >
        </div>
      </div>
      <div class="card">
        <div class="card-header">Edit Client</div>
        <div class="card-body">
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="firstName">Frst Name</label>
              <input
                type="text"
                class="form-control"
                name="firstName"
                required
                minlength="2"
                v-model="clientData.firstName"
              />
            </div>
            <div class="form-group">
              <label for="lastName">Last Name</label>
              <input
                type="text"
                class="form-control"
                name="lastName"
                required
                minlength="2"
                v-model="clientData.lastName"
              />
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input
                type="email"
                class="form-control"
                name="email"
                v-model="clientData.email"
              />
            </div>
            <div class="form-group">
              <label for="phone">Phone</label>
              <input
                type="tel"
                class="form-control"
                name="phone"
                required
                minlength="10"
                v-model="clientData.phone"
              />
            </div>
            <div class="form-group">
              <label for="balance">Balance</label>
              <input
                type="text"
                class="form-control"
                name="balance"
                v-model="clientData.balance"
              />
            </div>
            <input
              type="submit"
              value="Submit"
              class="btn btn-primary btn-block"
            />
          </form>
        </div>
      </div>
    </template>
    <template v-else>
      <Spinner />
    </template>
  </div>
</template>

<script>
import Spinner from "../layout/Spinner";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    Spinner
  },
  data() {
    return {
      // firstName: "",
      // lastName: "",
      // email: "",
      // phone: "",
      // balance: "",
      // firstName: client && client.firstName,
      // lastName: client && client.lastName,
      // email: client && client.email,
      // phone: client && client.phone,
      // balance: client && client.balance,
      clientData: this.client ? "" : ""
      // clientData: this.$store.state.client ? this.$store.state.client : ""
      // this.$store.state.client,
      // clientData: {
      //   firstName: client.firstName,
      //   lastName: client.lastName,
      //   email: client.email,
      //   phone: client.phone,
      //   balance: client.balance
      // }
    };
  },
  computed: {
    ...mapState(["client", "loading"])
  },
  methods: {
    ...mapActions(["getSingleClient", "updateClient"]),
    populateClientData() {
      if (this.client && !this.loading) {
        // this.clientData = this.client;
        this.firstName = this.client.firstName || "";
        this.lastName = this.client.lastName || "";
        this.email = this.client.email || "";
        this.phone = this.client.phone || "";
        this.balance = this.client.balance || "";
      } else {
        return null;
      }
    },
    handleSubmit() {
      this.clientData.balance =
        this.clientData.balance === "" ? 0 : this.clientData.balance;
      this.updateClient(this.clientData);
    }
  },
  mounted() {
    this.getSingleClient();
  },
  updated() {
    this.clientData = this.client;
  }
};
</script>
