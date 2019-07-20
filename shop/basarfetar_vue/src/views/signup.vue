<template>
<div v-html="signup_page" class="noside-container py-3 d-flex w-100 justify-content-center pt-3 pt-sm-5" :style="$store.state.cards_container_height">
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
          this.set_msg('خطا! از اتصال اینترنت خود مطمئن شوید یا لحظاتی بعد مجددا امتحان کنید', 'error');
      });
  },
}
</script>