<template>
<div v-html="cart_page">
</div>
</template>

<script>
export default {
  name: 'cart',
  data() {
      return {
          cart_page: ''
      }
  },
  mounted() {
        this.$root.$refs.topProgress.start()
        this.$http.get('/cart').then(response => {
        this.$root.$refs.topProgress.done()
        this.cart_page = response.body;
      }, response => {
          this.$root.$refs.topProgress.fail()
          this.set_msg('خطا! از اتصال اینترنت خود مطمئن شوید یا لحظاتی بعد مجددا امتحان کنید', 'alert-danger');
      });
  },
}
</script>