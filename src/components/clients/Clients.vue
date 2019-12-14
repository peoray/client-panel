<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <h2><i class="fas fa-users"></i> Clients</h2>
      </div>
      <div class="col-md-6"></div>
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
          <td>{{ parseFloat(client.balance).toFixed(2) }}</td>
          <td>
            <router-link :to="`/client/${client.id}`" class="btn btn-secondary"
              ><i class="fas fa-arrow-circle-right"></i> Details</router-link
            >
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clients: [
        {
          id: "3e323",
          firstName: "Emmanuel",
          lastName: "Raymond",
          email: "emma@gmail.com",
          phone: "555-55-55",
          balance: "50"
        },
        {
          id: "djjw",
          firstName: "kachi",
          lastName: "Jane",
          email: "kachi@gmail.com",
          phone: "123-56-99",
          balance: "10"
        },
        {
          id: "sjjs",
          firstName: "Tony",
          lastName: "Okpe",
          email: "tony@gmail.com",
          phone: "49-332-424",
          balance: "90.99"
        }
      ]
    };
  }
};
</script>
