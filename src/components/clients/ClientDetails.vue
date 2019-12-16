<template>
  <div>
    <template v-if="!loading && client">
      <div class="row">
        <div class="col-md-6">
          <router-link to="/" class="btn btn-link">
            <i class="fas fa-arrow-circle-left"></i> Back to Dashboard
          </router-link>
        </div>
        <div class="col-md-6">
          <div class="btn-group float-right">
            <router-link :to="`/client/edit/${client.id}`" class="btn btn-dark"
              >Edit</router-link
            >
            <button class="btn btn-danger" @click="handleDeleteClient">
              Delete
            </button>
          </div>
        </div>
      </div>

      <hr />
      <div class="card">
        <h3 class="card-header">
          {{ client.firstName }} {{ client.lastName }}
        </h3>
        <div class="card-body">
          <div class="row">
            <div class="col-md-8 col-sm-6">
              <h4>
                Client ID: <span class="text-secondary">{{ client.id }}</span>
              </h4>
            </div>
            <div class="col-md-4 col-sm-6">
              <h3 class="pull-right">
                Balance:
                <span
                  :class="{
                    'text-danger': client.balance > 0,
                    'text-success': client.balance === '0'
                  }"
                  >${{ parseFloat(client.balance).toFixed(2) }}</span
                >
                <small>
                  <a href="#" @click="showBalanceUpdate = !showBalanceUpdate">
                    <i class="fas fa-pencil-alt"></i>
                  </a>
                </small>
              </h3>
              <form
                v-if="showBalanceUpdate"
                @submit.prevent="updateBalanceAmount"
              >
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    v-model="balanceUpdateAmount"
                    placeholder="Add New Balance"
                  />
                  <div class="input-group-append">
                    <input
                      type="submit"
                      class="btn btn-outline-dark"
                      value="Update"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
          <hr />
          <ul class="list-group">
            <li class="list-group-item">Contact Email: {{ client.email }}</li>
            <li class="list-group-item">Contact Phone: {{ client.phone }}</li>
          </ul>
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
      showBalanceUpdate: false,
      balanceUpdateAmount: ""
    };
  },
  computed: {
    ...mapState(["client", "loading"])
  },
  methods: {
    ...mapActions(["getSingleClient", "updateBalance", "deleteClient"]),
    updateBalanceAmount() {
      this.updateBalance(this.balanceUpdateAmount).then(
        (this.showBalanceUpdate = false)
      );
    },
    handleDeleteClient() {
      if (confirm("Are you sure?")) {
        return this.deleteClient();
      }
      return false;
    }
  },
  mounted() {
    this.getSingleClient();
  }
};
</script>
