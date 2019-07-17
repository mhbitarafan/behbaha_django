<template>
<div v-html="signup_page">
</div>
</template>

<script>
export default {
  name: 'accountmanage',
  data() {
      return {
          signup_page: ''
      }
  },
  mounted() {
        this.$root.$refs.topProgress.start();
        this.$http.get('/account/signup/').then(response => {
        this.$root.$refs.topProgress.done();
        this.signup_page = response.body;
      }, response => {
          this.$root.$refs.topProgress.fail()
          this.set_msg('خطا! از اتصال اینترنت خود مطمئن شوید یا لحظاتی بعد مجددا امتحان کنید', 'alert-danger');
      });
  },
}
</script>