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
              <input type="checkbox" name="registration" />
            </div>
            <div class="form-group">
              <label for="registration">Disable Balance on Add</label>
              <input type="checkbox" name="registration" />
            </div>
            <div class="form-group">
              `
              <label for="registration">Disable Balance on Edit</label>
              <input type="checkbox" name="registration" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>
