<template>
  <div>
    <div class="row">
      <div class="col-md-6 mx-auto">
        <div class="card">
          <div class="card-body">
            <Alert />
            <h1 class="text-center pb-4 pt-3">
              <span class="text-primary"><i class="fas fa-lock"></i></span>
              Register
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
                value="Register"
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
import Alert from '../layout/Alert';
import { mapActions } from 'vuex';
export default {
  components: {
    Alert
  },
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    ...mapActions(['registerUser']),
    handleSubmit() {
      this.registerUser({ email: this.email, password: this.password });
    }
  }
};
</script>
