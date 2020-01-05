<template>
  <div>
    <template v-if="!loading && clients">
      <div class="row">
        <div class="col-md-6">
          <h2><i class="fas fa-users"></i> Clients</h2>
        </div>
        <div class="col-md-6">
          <h5 class="text-right text-secondary">
            Total owed:
            <span class="text-primary"
              >${{ parseFloat(totalOwed).toFixed(2) }}</span
            >
          </h5>
        </div>
      </div>
      <table class="table table-striped">
        <thead class="thead-inverse">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Balance</th>
            <th />
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in clients" :key="client.id">
            <td>{{ client.firstName }} {{ client.lastName }}</td>
            <td>{{ client.email }}</td>
            <td>${{ parseFloat(client.balance).toFixed(2) }}</td>
            <td>
              <router-link
                :to="`/client/${client.id}`"
                class="btn btn-secondary"
                ><i class="fas fa-arrow-circle-right"></i> Details</router-link
              >
            </td>
          </tr>
        </tbody>
      </table>
    </template>
    <template v-else>
      <Spinner />
    </template>
  </div>
</template>

<script>
import Spinner from '../layout/Spinner';
import { mapActions, mapGetters } from 'vuex';
export default {
  components: {
    Spinner
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['clients', 'user', 'loading']),
    totalOwed() {
      // use this as getter in vuex store
      if (this.clients && !this.loading) {
        return this.clients.reduce((total, client) => {
          return (total += parseFloat(client.balance.toString()));
        }, 0);
      }
      return null;
    }
  },
  methods: {
    ...mapActions(['getClients'])
  },
  created() {
    this.getClients();
  }
};
</script>
