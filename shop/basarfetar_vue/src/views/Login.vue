<template>
<div v-html="login_page" class="noside-container py-3 d-flex w-100 justify-content-center pt-3 pt-sm-5" :style="$store.state.cards_container_height"></div>
</template>

<script>
export default {
  name: 'login',
  data() {
      return {
          login_page: ''
      }
  },
  mounted() {
        this.$root.$refs.topProgress.start();
        this.$http.get('/account/login-ajax/').then(response => {
        this.$root.$refs.topProgress.done();
        this.login_page = response.body;
      }, response => {
          this.$root.$refs.topProgress.fail()
          this.set_msg('خطا! از اتصال اینترنت خود مطمئن شوید یا لحظاتی بعد مجددا امتحان کنید', 'alert-danger');
      });
  },
}
</script>