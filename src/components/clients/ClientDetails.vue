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
                  <a href="#" @click="toggleShowBalance">
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
                    type="number"
                    class="form-control"
                    ref="balance"
                    v-model="balanceUpdateAmount"
                    placeholder="Add New Balance"
                    required
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
import { mapActions, mapGetters } from "vuex";
import Vue from "vue";
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
    ...mapGetters(["client", "loading"])
  },
  methods: {
    ...mapActions(["getSingleClient", "updateBalance", "deleteClient"]),
    focusInput() {
      this.$refs.balance.focus();
    },
    toggleShowBalance() {
      this.showBalanceUpdate = !this.showBalanceUpdate;
      var vm = this;
      if (this.showBalanceUpdate) {
        Vue.nextTick(function() {
          vm.$refs.balance.focus();
        });
      }
    },
    updateBalanceAmount() {
      this.updateBalance(this.balanceUpdateAmount).then(() => {
        this.balanceUpdateAmount = "";
        this.showBalanceUpdate = false;
      });
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
