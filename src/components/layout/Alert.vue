<template>
  <div v-if="notification.message">
    <div
      class="alert"
      :class="{
        'alert-success': notification.type === 'success',
        'alert-danger': notification.type === 'error'
      }"
    >
      {{ notification.message }}
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["notification"])
  }
};
</script>
