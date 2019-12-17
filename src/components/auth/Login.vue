<template>
  <div>
    <div class="row">
      <div class="col-md-6 mx-auto">
        <div class="card">
          <div class="card-body">
            <h1 class="text-center pb-4 pt-3">
              <span class="text-primary"><i class="fas fa-lock"></i></span>
              Login
            </h1>
            <form @submit.prevent="handleSubmit">
              <div class="form-group">
                <label for="email">Email</label>
                <input
                  type="email"
                  class="form-control"
                  name="email"
                  placeholder="Enter your email"
                  v-model="email"
                  required
                />
              </div>
              <div class="form-group">
                <label for="password">Password</label>
                <input
                  type="password"
                  class="form-control"
                  name="password"
                  placeholder="Enter your password"
                  v-model="password"
                  required
                />
              </div>
              <input
                type="submit"
                value="Login"
                class="btn btn-primary btn-block"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    ...mapActions(["loginUser"]),
    handleSubmit() {
      console.log(this.email);
      console.log(this.password);
      this.loginUser({ email: this.email, password: this.password });
    }
  }
};
</script>
