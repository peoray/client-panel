<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <router-link to="/" class="btn btn-link"
          ><i class="fas fa-arrow-circle-left"></i> Back to
          Dashboard</router-link
        >
      </div>
    </div>
    <div class="card">
      <div class="card-header">Add Client</div>
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
              v-model="client.firstName"
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
              v-model="client.lastName"
            />
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input
              type="email"
              class="form-control"
              name="email"
              v-model="client.email"
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
              v-model="client.phone"
            />
          </div>
          <div class="form-group">
            <label for="balance">Balance</label>
            <input
              type="text"
              class="form-control"
              name="balance"
              v-model="client.balance"
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
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      client: {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        balance: ""
      }
    };
  },
  methods: {
    ...mapActions(["createClient"]),
    handleSubmit() {
      this.createClient(this.client);
    }
  }
};
</script>
