<template>
  <div>
    <div class="row">
      <div class="col-md-6">
        <router-link to="/" tag="a" class="btn btn-link">
          <i class="fas fa-arrow-circle-left"></i> Back to Dashboard
        </router-link>
      </div>
    </div>
    <div class="card">
      <div class="card-header">
        <div class="card-body">
          <form>
            <div class="form-group">
              <label for="registration">Allow registration</label>
              <input
                type="checkbox"
                name="registration"
                :checked="!!allowRegistrationModel"
                @change="handleAllowRegistrationFn"
                v-model="allowRegistrationModel"
              />
            </div>
            <div class="form-group">
              <label for="registration">Disable Balance on Add</label>
              <input
                type="checkbox"
                name="registration"
                :checked="!!disableBalanceOnAdd"
                @change="handleDisableBalanceOnAddFn"
                v-model="disableBalanceOnAddModel"
              />
            </div>
            <div class="form-group">
              `
              <label for="registration">Disable Balance on Edit</label>
              <input
                type="checkbox"
                name="registration"
                :checked="!!disableBalanceOnEdit"
                v-model="disableBalanceOnEditModel"
                @change="handleDisableBalanceOnEditFn"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {
      allowRegistrationModel: !this.allowRegistration,
      disableBalanceOnAddModel: !this.disableBalanceonAdd,
      disableBalanceOnEditModel: !!this.disableBalanceonEdit
    };
  },
  computed: {
    ...mapState([
      "disableBalanceOnAdd",
      "disableBalanceOnEdit",
      "allowRegistration"
    ])
  },
  methods: {
    ...mapActions([
      "handleAllowRegistration",
      "handleDisableBalanceOnAdd",
      "handleDisableBalanceOnEdit"
    ]),
    handleAllowRegistrationFn() {
      this.handleAllowRegistration();
    },
    handleDisableBalanceOnAddFn() {
      // this.handleDisableBalanceOnAdd();
    },
    handleDisableBalanceOnEditFn() {
      this.handleDisableBalanceOnEdit();
    }
  }
};
</script>
