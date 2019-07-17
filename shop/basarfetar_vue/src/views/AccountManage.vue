<template>
<div v-html="account_manage_page">
</div>
</template>

<script>
export default {
  name: 'accountmanage',
  data() {
      return {
          account_manage_page: ''
      }
  },
  mounted() {
        this.$root.$refs.topProgress.start();
        this.$http.get('/account/manage/').then(response => {
        this.$root.$refs.topProgress.done();
        this.account_manage_page = response.body;
      }, response => {
          this.$root.$refs.topProgress.fail()
          this.set_msg('خطا! از اتصال اینترنت خود مطمئن شوید یا لحظاتی بعد مجددا امتحان کنید', 'alert-danger');
      });
  },
}
</script>